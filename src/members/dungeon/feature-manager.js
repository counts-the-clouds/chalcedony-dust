global.FeatureManager = (function() {

  let $features = {};

  function clear() { $features = {}; }
  function getFeatures() { return $features; }

  function tileAdded(tile) {
    if (tile.getCoordinates() == null) { throw 'A placed tile needs coordinates.' }

    const neighbors = tile.getNeighbors()

    tile.getSegments().forEach(segment => {
      processSegment(segment, neighbors, tile);
    });
  }

  function processSegment(segment, neighbors, tile) {
    const exits = segment.getExits(tile.getRotation());

    // console.log(`Process Segment ${segment}`)
    // console.log('   Exits',exits);
    // console.log(`   Neighbors`,neighbors);

    // If a segment has no exits then it can't be a part of a feature. Single
    // tile features will be a thing, but they're not part of the feature
    // graph.
    if (exits.length === 0) { return false; }

    const connections = {}
    exits.forEach(exitDirection => {
      connections[exitDirection] = neighbors[exitDirection];
    });

    // console.log("   Connections:",connections);

    // If all neighbors are null then we know this is a new feature because it
    // doesn't connect to anything.
    if (allNullValues(connections)) {
      return createFeature(segment);
    }
c
    console.log(`${segment} connects to`,connections);

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
    const feature = Feature({});
          feature.addSegment(segment);

    $features[feature.getID()] = feature;
  }

  function featuresForTile(tile) {
    return Object.values($features).filter(feature => {
      return feature.getTiles().map(t => t.getID()).includes(tile.getID());
    });
  }

  return Object.freeze({
    clear,
    featuresForTile,
    tileAdded,
  })

})();
