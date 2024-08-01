global.FeatureGraph = (function() {

  function clear() {

  }

  function tileAdded(tile) {
    if (tile.getCoordinates() == null) { throw 'A placed tile needs coordinates.' }

    const neighbors = tile.getNeighbors()

    tile.getSegments().forEach(segment => {
      processSegment(segment, neighbors);
    });
  }

  function processSegment(segment, neighbors) {
    const exits = segment.getExits();

    // If a segment has no exits then it can't be a part of a feature. Single
    // tile featucres will be a thing, but they're not part of the feature
    // graph.
    if (exits.length === 0) { return false; }

    const connections = {}
    segment.getExits().forEach(exitDirection => {
      if (neighbors[exitDirection] == null) {
        connections[exitDirection] = neighbors[exitDirection];
      }
    });

    // If all neighbors are null then we know this is a new feature because it
    // doesn't connect to anything.
    if (allNullValues(connections)) {
      createFeature(segment);
    }

    // If there is one neighboring tile then we join that feature.

    // If there is more than one neighboring tile we need to see if they are
    // part of the same feature. If so we add this tile. If they are different
    // features then the features are getting joined together.
  }

  function allNullValues(object) {
    const values = [...new Set(Object.values(object))];
    return values.length === 1 && values[0] == null;
  }

  function createFeature(segment) {
    console.log(`Create Feature From ${segment}`)
  }

  return Object.freeze({
    clear,
    tileAdded,
  })

})();
