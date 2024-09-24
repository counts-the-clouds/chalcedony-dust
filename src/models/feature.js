global.Feature = function(data) {

  const $id = data.id || FeatureDataStore.nextID();
  const $segments = data.segments || [];

  let $type = data.type;
  let $constructionID = data.constructionID;
  let $state = data.state || FeatureState.incomplete;

  // ===========================================================================

  function getID() { return $id; }
  function getSegments() { return $segments.map(id => { return SegmentDataStore.get(id); }); }
  function setState(state) { $state = state; }
  function getState() { return $state; }
  function getType() { return $type; }
  function getSize() { return getTiles().length; }

  // It's possible for a tile to appear more than once in the same feature.
  // Consider two unconnected rooms on a single tile that get connected by
  // tiles placed around them.
  function getTiles() {
    return ArrayHelper.unique(getSegments().map(segment => segment.getTile()));
  }

  // The distance to the origin from the feature is the distance from the
  // closest tile.
  function distanceToOrigin() {
    return getTiles().map(tile => tile.distanceToOrigin()).toSorted()[0]
  }

  // The segments should all have the same type, so it should be fine to set
  // the feature type to the type of the first segment added. Type should never
  // change and I use it often enough that it's probably fine to have the same
  // value stored on the feature and all of its segments.
  function addSegment(segment) {
    segment.setFeatureID($id);

    if ($type == null) {
      $type = segment.getType();
    }

    if ($segments.includes(segment.getID()) === false) {
      $segments.push(segment.getID());
    }
  }

  // Check the status of all multi tile features. The status of the node
  // features are checked separately because their status is determined by the
  // completeness of the features it shares a tile with, so they need to be
  // done first.
  function checkStatus() {
    if ([TileType.core,TileType.node].includes(getType())) { return false; }

    for (const segment of getSegments()) {
      if (segment.shouldBeComplete() === false) { return false; }
    }

    log(`${toString()} Completed`,{ system:'Feature', level:1 });
    complete();
  }

  // After this feature has been completed, and after a short delay, we check
  // to see if any node features connected to this one should be completed. If
  // so we create a guardian node.
  function checkNodeStatus() {
    getTiles().forEach(tile => {
      tile.getFeatures().forEach(async feature => {
        if (feature.getType() === TileType.node) {
          const segment = feature.getSegments()[0];
          if (feature.isNotIncomplete() === false && segment.shouldBeComplete()) {
            await feature.createGuardianNode();
          }
        }
      })
    });
  }

  async function createGuardianNode() {
    if (getType() !== TileType.node) { throw `A guardian node must be of type node.` }
    if ($constructionID != null) { throw `A guardian node has already been built for this feature.`}

    complete();
    $constructionID = GuardianNode({ featureID:getID() }).getID();
    await GameState.saveState();
  }

  // Because this function depends on the cell and tile containers it does
  // nothing in test or when the Dungeon isn't visible for whatever reason.
  function complete() {
    if (DungeonView.isVisible()) {
      setState(FeatureState.complete);

      const segments = getSegments();

      const cellContainers = segments.map(segment => {
        const coordinates = segment.getTile().getCoordinates();
        return DungeonView.getCellContainerAt(coordinates.gx, coordinates.gy);
      });

      Panopticon.induce(EventType.featureCompleted,{ feature:$self });

      waitForTileContainers(cellContainers).then(tileContainers => {
        segments.forEach((segment,i) => {
          tileContainers[i].segmentComplete(segment);
        });

        setTimeout(checkNodeStatus,500)
      });
    }
  }

  // We don't need to wait long. The tile container is -usually- there by the
  // time this promise is scheduled to run, but the placed tile is never there
  // before this promise.
  function waitForTileContainers(cellContainers) {
    return new Promise(resolve => {
      let interval = setInterval(() => {
        const tileContainers = cellContainers.map(container => container.getTileContainer());

        if (tileContainers.includes(null) === false) {
          clearInterval(interval);
          resolve(tileContainers);
        }
      },1);
    });
  }

  // TODO: Source of some potential bugs here. Thinking about it, do
  //       segments need to store their own state? If a segment is on the
  //       dungeon grid it should be a part of a feature. Segments should
  //       always get their state from their feature state.

  function isNotIncomplete() {
    if ($segments.length > 0) {
      return SegmentDataStore.get($segments[0]).getState() !== FeatureState.incomplete;
    }
    throw `Don't call isNotIncomplete() when there are no segments. The feature 
           would not be incomplete, but not in the way you're probably thinking.`
  }

  // === Construction ==========================================================

  // If the construction id is null, then this is a new construction on the
  // empty room. If the construction ID has been set then this is an upgrade of
  // an existing construction.
  function attachConstruction(code) {
    if ($constructionID != null) {
      return getConstruction().upgradeTo(code);
    }
    if ($type === TileType.hall) {
      $constructionID = Hall({ code, featureID:getID() }).getID();
    }
    if ($type === TileType.resource) {
      $constructionID = Resource({ code, featureID:getID() }).getID();
    }
    if ($type === TileType.room) {
      $constructionID = Room({ code, featureID:getID() }).getID();
    }
  }

  function getConstruction() {
    if ($constructionID) {
      switch ($type) {
        case TileType.hall: return HallDataStore.get($constructionID);
        case TileType.resource: return ResourceDataStore.get($constructionID);
        case TileType.room: return RoomDataStore.get($constructionID);
        case TileType.node: return GuardianNodeDataStore.get($constructionID);
        default: `No construction for type ${type}`;
      }
    }
  }

  async function startConstruction(code) {
    log(`Construction started on ${toString()}`,{ system:'Feature', data:{ code }});

    Blueprint(code).startConstruction(getID());
    setState(FeatureState.building);
    applyTint(FeatureState.building);

    await GameState.saveState();
  }

  async function completeConstruction(code) {
    log(`Construction completed on ${toString()}`,{ system:'Feature', data:{ code }});

    setState(FeatureState.constructed);
    applyTint(FeatureState.constructed);
    attachConstruction(code);
    Blueprint(code).onConstructionComplete($self);

    Panopticon.induce(EventType.constructionComplete,{ code });

    await GameState.saveState();
  }

  function getPossibleUpgrades() {
    const construction = getConstruction();
    const upgrades = [];

    // TODO: We'll also need to see if this room has other requirements before
    //       adding it to the list of possible upgrades.
    BlueprintRegistry.forEach((code, blueprint) => {
      if (blueprint.upgradeFrom === construction.getCode()) {
        upgrades.push(code);
      }
    });

    return upgrades;
  }

  // === Feature Workers and Clocks ============================================

  async function assignWorker(slot, minionCode) {
    const construction = getConstruction();
    const clockCode = construction.getData().clockCode;

    if (MinionRoster.getAssignments($id)[slot] !== minionCode) {
      MinionRoster.assignMinion($id, slot, minionCode);

      if (clockCode != null && construction.getClock() == null) {
        startClock();
      }

      Panopticon.induce(EventType.workerAssignmentChanged,{ featureID:$id, slot:slot, code:minionCode });
    }
  }

  async function removeWorker(slot) {
    if (MinionRoster.getAssignments($id)[slot]) {
      MinionRoster.clearAssignment($id, slot);

      const assignmentCount = Object.keys(MinionRoster.getAssignments($id)).length;
      const construction = getConstruction();

      if (construction.getClock() && assignmentCount === 0) {
        construction.getClock().deleteSelf();
        construction.removeClock();
      }

      Panopticon.induce(EventType.workerAssignmentChanged,{ featureID:$id, slot:slot });
    }
  }

  function startClock() {
    const construction = getConstruction()
    const code = construction.getData().clockCode;
    const clock = Clock({ code });
    clock.setContext({ featureID:getID() });

    if (getType() === TileType.room) {
      clock.setParent({ type:'Feature', id:getID() });
    }
    if (getType() === TileType.resource) {
      const tile = getTiles()[0];
      clock.setParent({ type:'Tile', id:tile.getID() });
    }

    construction.setClock(clock);
    ClockManager.addClock(clock);
  }

  // ===========================================================================

  function getTileLayers() { return getSegments().map(seg => seg.getTileLayer()); }

  function applyTint(code) {
    const tint = ExtraRegistry.lookup('ColorPalette').segments[getType()][code];
    getTileLayers().forEach(layer => layer.applyTint(tint));
  }

  function startPulse() {
    const palette = ExtraRegistry.lookup('ColorPalette').segments[getType()];

    const c1 = ColorHelper.hexStringToColors(palette.building);
    const c2 = ColorHelper.hexStringToColors(palette.complete);

    const rLow = (c1.r < c2.r) ? c1.r : c2.r;
    const gLow = (c1.g < c2.g) ? c1.g : c2.g;
    const bLow = (c1.b < c2.b) ? c1.b : c2.b;

    const rRange = Math.abs(c1.r - c2.r);
    const gRange = Math.abs(c1.g - c2.g);
    const bRange = Math.abs(c1.b - c2.b);

    const pulseData = {
      value: 0,
      rLow, gLow, bLow,
      rRange, gRange, bRange,
    };

    getTileLayers().forEach(layer => layer.startPulse(pulseData));
  }

  function stopPulse() { getTileLayers().forEach(layer => layer.stopPulse()); }
  function onMouseEnter() { applyTint('select'); }
  function onMouseLeave() { applyTint(getState()); }

  // ===========================================================================

  function getDisplayName() {
    if (getType() === TileType.core) { return 'The Dungeon Core'; }

    if (getType() === TileType.resource) {
      return getConstruction().getDisplayName();
    }

    if (getType() === TileType.node) {
      const guardianNode = getConstruction();
      const guardian = guardianNode.getGuardian();

      return guardian == null ? `An Empty Guardian's Chamber` : `${guardian.getPossessiveFirstName()} Guardian Chamber`;
    }

    if (getType() === TileType.room) {
      switch (getState()) {
        case FeatureState.incomplete: return `An Incomplete Room`;
        case FeatureState.complete: return `An Empty Room`
      }
    }

    if (getType() === TileType.hall) {
      switch (getState()) {
        case FeatureState.incomplete: return `An Incomplete Corridor`;
        case FeatureState.complete: return `An Empty Corridor`
      }
    }
  }

  function toString() {
    return `Feature:${$id}`;
  }

  function pack() {
    return {
      id: $id,
      state: $state,
      type: $type,
      segments: $segments,
      constructionID: $constructionID,
    }
  }

  // ===========================================================================

  const $self = Object.freeze({
    model: 'Feature',
    getID,
    getSegments,
    setState,
    getState,
    getType,
    getSize,
    attachConstruction,
    getConstruction,
    getTiles,
    distanceToOrigin,
    addSegment,
    checkStatus,
    createGuardianNode,
    complete,
    isNotIncomplete,
    startConstruction,
    completeConstruction,
    getPossibleUpgrades,
    assignWorker,
    removeWorker,
    getTileLayers,
    applyTint,
    startPulse,
    stopPulse,
    onMouseEnter,
    onMouseLeave,
    getDisplayName,
    toString,
    pack,
  });

  FeatureDataStore.store($self);

  return $self;

}
