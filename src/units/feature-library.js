global.FeatureLibrary = (function() {

  let $features = {};

  function reset() { $features = {}; }
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

    Object.keys(connections).forEach(direction => {
      const neighbor = connections[direction];
      if (neighbor) {
        connectFeatures(segment, direction, neighbor);
      }
    });

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

  function connectFeatures(segment, direction, neighbor) {
    let connectingSegment = neighbor.getSegments().filter(seg => {
      return seg.getExits(neighbor.getRotation()).includes(reflect(direction))
    })[0];

    if (connectingSegment.getType() !== segment.getType()) {
      const a = `${segment}=${segment.getType()}`;
      const b = `${connectingSegment}=${connectingSegment.getType()}`;
      throw `Cannot connect segments. Types do not match. ${a} ${b}`
    }

    const feature = $features[connectingSegment.getFeatureID()];
          feature.addSegment(segment);

    // Connections are bidirectional to make graph transversal easier, but the
    // feature is essentially a bidirected graph where each node has two edges
    // in either direction.
    segment.setConnection(direction, connectingSegment);
    connectingSegment.setConnection(reflect(direction), segment);
  }

  // Should this be made into a general helper function? I think rotating a
  // directional (n,s,e,w) object should be as well. Should directional be a
  // more robust object?
  function reflect(direction) {
    return { n:_s, s:_n, e:_w, w:_e }[direction];
  }

  // This could be made easier now that the segments are storing the feature ID.
  // This is only used by a spec though, so it might not actually be needed.
  function featuresForTile(tile) {
    return Object.values($features).filter(feature => {
      return feature.getTiles().map(t => t.getID()).includes(tile.getID());
    });
  }

  function pack() {

  }

  function unpack(data) {

  }

  return Object.freeze({
    reset,
    featuresForTile,
    tileAdded,
    pack,
    unpack,
  });

})();
