global.DiscoveryAdjuster = (function() {

  // When adding a resource node to a tile we first remove all the old segments
  // and replace them with new ones with the same types and exits. This may be
  // surprising to the player. When a tile is placed some features that looked
  // like they should continue (like a straight hallway) turn into a new tile
  // where that hall is split now. This is the intended behavior.
  function addResourceNode(tile, discovery) {
    const oldSegments = tile.getSegments();
    let index = 0;
    tile.resetSegments()

    // First check to see if any of the segments are attached to features
    // already. They shouldn't be. These adjustments should be made when
    // moving a tile from the shelf to the dungeon. If a segment can have
    // features here though we'll need to remove the segments from their
    // associated features as well.
    oldSegments.forEach(oldSegment => {
      if (oldSegment.getFeatureID()) {
        throw `The tile shouldn't have been placed yet, so it shouldn't have features... right?`
      }
    });

    oldSegments.forEach(oldSegment => {
      oldSegment.getExits().forEach(direction => {
        const segment = Segment({
          tileID: tile.getID(),
          type: oldSegment.getType(),
          index: index++,
          exits: [direction],
          graphics: graphicsForType(oldSegment.getType(), direction)
        });

        tile.addSegment(segment);
      });
    });

    oldSegments.forEach(oldSegment => {
      SegmentDataStore.remove(oldSegment.getID())
    });

    const resourceSegment = Segment({ tileID:tile.getID(), type:TileType.resource, index:index, graphics:{ shape:'resource-node' } });

    const feature = Feature({ state:FeatureState.complete });
    feature.addSegment(resourceSegment);
    feature.attachConstruction(discovery.code);

    tile.addSegment(resourceSegment);

    console.log(`Discover Made on ${tile}`,discovery)
  }

  function graphicsForType(type, direction) {
    const graphics = { };
    const rotate = rotationForDirection(direction);

    if (type === TileType.room) { graphics.shape = 'room-wedge' }
    if (type === TileType.hall) { graphics.shape = 'hall-short' }
    if (rotate > 0) { graphics.rotate = rotate; }

    if (graphics.shape == null) {
      throw `No configured replacement graphics for type ${type}`;
    }

    return graphics;
  }

  function rotationForDirection(direction) {
    switch (direction) {
      case _n: return 0;
      case _e: return 1;
      case _s: return 2;
      case _w: return 3;
      default: throw `Bad direction ${direction}`;
    }
  }

  return Object.freeze({
    addResourceNode,
  });

})();