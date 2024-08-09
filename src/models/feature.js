global.Feature = function(data) {

  const $id = data.id || FeatureDataStore.nextID();
  const $segments = data.segments || [];

  let $state = data.state || _incomplete;

  // ===========================================================================

  function getID() { return $id; }
  function getSegments() { return $segments; }
  function getState() { return $state; }
  function getType() { return $segments.length > 0 ? $segments[0].getType() : null; }

  // It's possible for a tile to appear more than once in the same feature.
  // Consider two unconnected rooms on a single tile that get connected by
  // tiles placed around them.
  function getTiles() {
    return ArrayHelper.unique($segments.map(segment => segment.getTile()));
  }

  function addSegment(segment) {
    segment.setFeatureID($id);

    if ($segments.map(s => s.getID()).includes(segment.getID()) === false) {
      $segments.push(segment);
    }
  }

  // Check the status of all multi tile features. The status of the node
  // features are checked separately because their status is determined by the
  // completeness of the features it shares a tile with, so they need to be
  // done first.
  function checkStatus() {
    if ([_core,_node].includes(getType())) { return false; }

    for (const segment of $segments) {
      if (segment.shouldBeComplete() === false) { return false; }
    }

    log(`${toString()} Completed`,{ system:'Feature', level:1 });
    complete();
  }

  // After this feature has been completed, and after a short delay, we check
  // to see if any node features connected to this one should be completed.
  function checkNodeStatus() {
    getTiles().forEach(tile => {
      tile.getFeatures().forEach(feature => {
        if (feature.getType() === _node) {
          const segment = feature.getSegments()[0];
          if (feature.isNotIncomplete() === false && segment.shouldBeComplete()) {
            feature.complete();
          }
        }
      })
    });
  }

  // Because this function depends on the cell and tile containers it does
  // nothing in test or when the Dungeon isn't visible for whatever reason.
  function complete() {
    if (DungeonView.isVisible()) {
      $state = _complete;

      const cellContainers = $segments.map(segment => {
        const coordinates = segment.getTile().getCoordinates();
        return DungeonView.getCellContainerAt(coordinates.gx, coordinates.gy);
      });

      waitForTileContainers(cellContainers).then(tileContainers => {
        $segments.forEach((segment,i) => {
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

  function isNotIncomplete() {
    return $segments[0].getState() !== _incomplete;
  }

  function toString() {
    return `Feature:${$id}`;
  }

  function pack() {
    return {
      id: $id,
      state: $state,
      segments: $segments,
    }
  }

  // ===========================================================================

  const $self = Object.freeze({
    getID,
    getSegments,
    getState,
    getType,
    getTiles,
    addSegment,
    checkStatus,
    complete,
    isNotIncomplete,
    toString,
    pack,
  });

  FeatureDataStore.store($self);

  return $self;

}
