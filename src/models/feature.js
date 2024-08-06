global.Feature = function(data) {

  const $id = data.id || FeatureDataStore.nextID();
  const $segments = data.segments || [];

  // ===========================================================================

  function getID() { return $id; }
  function getSegments() { return $segments; }

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

  function checkStatus() {
    let isComplete = true;

    $segments.forEach(segment => {
      if (segment.isComplete() === false) { isComplete = false; }
    });

    if (isComplete) {
      log(`${toString()} Completed`,{ system:'Feature', level:1 });
      complete();
    }
  }

  function complete() {
    if (DungeonView.isVisible()) {
      const cellContainers = $segments.map(segment => {
        const coordinates = segment.getTile().getCoordinates();
        return DungeonView.getCellContainerAt(coordinates.gx, coordinates.gy);
      });

      waitForTileContainers(cellContainers).then(tileContainers => {
        $segments.forEach((segment,i) => {
          segment.setState(_complete);
          tileContainers[i].segmentComplete(segment);
        });
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

  function toString() {
    return `Feature:${$id}`;
  }

  function pack() {
    return {
      id: $id,
      segments: $segments,
    }
  }

  // ===========================================================================

  const $self = Object.freeze({
    getID,
    getSegments,
    getTiles,
    addSegment,
    checkStatus,
    toString,
    pack,
  });

  FeatureDataStore.store($self);

  return $self;

}
