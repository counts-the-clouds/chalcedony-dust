global.Feature = function(data) {

  const $id = data.id || FeatureDataStore.nextID();
  const $segments = data.segments || {};

  // ===========================================================================

  function getID() { return $id; }
  function getSegments() { return $segments; }

  // It's possible for a tile to appear more than once in the same feature.
  // Consider two unconnected rooms on a single tile that get connected by
  // tiles placed around them.
  function getTiles() {
    return ArrayHelper.unique(Object.values($segments).map(segment => segment.getTile()));
  }

  function addSegment(segment) {
    segment.setFeatureID($id);
    $segments[segment.getID()] = segment;
  }

  function checkStatus() {
    let isComplete = true;

    Object.values($segments).forEach(segment => {
      if (segment.isComplete() === false) { isComplete = false; }
    });

    if (isComplete) {
      log(`${toString()} Completed`,{ system:'Feature', level:1 });
      complete();
    }
  }

  function complete() {
    if (DungeonView.isVisible()) {
      Object.values($segments).forEach(segment => {
        // TODO: The segment needs to be set to complete. I think it's time to
        //       rework how segments were stored in the tile. The whole form
        //       thing made more sense when I thought I would have different
        //       sprites at different levels of completeness. I still might,
        //       but I don't think 'form' makes a lot of sense.

        const coordinates = segment.getTile().getCoordinates();
        const cellContainer = DungeonView.getCellContainerAt(coordinates.gx, coordinates.gy);
        const tileContainer = cellContainer.getTileContainer();

        // TODO: Tile container will be null for the tile being placed. We need
        //       to wait for the tile containers to all exist before we mark
        //       call the segmentComplete() function for each segment. We need
        //       to set up some polling I think.

        console.log("Tile Container? ",tileContainer);
        // tileContainer.segmentComplete(segment);
      });
    }
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
