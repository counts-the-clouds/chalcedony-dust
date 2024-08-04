global.FeatureManager = (function() {

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

    // If all neighbors are null then we know this is a new feature because it
    // doesn't connect to anything.
    if (allNullValues(connections)) {
      return createFeature(segment);
    }

    Object.keys(connections).forEach(direction => {
      const neighbor = connections[direction];
      if (neighbor) {
        connectSegments(segment, direction, neighbor);
      }
    });

    // If this segment connects to more than one neighboring tile we need to
    // see if they are part of different feature. If so we need to merge the
    // features together.
    if (ArrayHelper.compact(Object.values(connections)).length > 1) {
      const features = new Set();

      Object.keys(connections).forEach(direction => {
        const neighbor = connections[direction];
        if (neighbor) {
          features.add(neighbor.getSegmentWithExit(reflect(direction)).getFeatureID());
        }
      });

      mergeFeatures([...features]);
    }

    const parentFeature = segment.getFeature();
    log(`${segment} added to ${parentFeature}`,{ system:'FeatureManager', level:3, data:{
      segments: Object.values(parentFeature.getSegments()).map(seg => { return seg.toString() })
    }});

    // Every time a segment is added to a feature we check to see if it's been
    // completed.
    parentFeature.checkStatus()
  }

  function allNullValues(object) {
    const values = [...new Set(Object.values(object))];
    return values.length === 1 && values[0] == null;
  }

  function createFeature(segment) {
    const feature = Feature({});
          feature.addSegment(segment);
  }

  // In order to connect segments we get the matching segment from the
  // neighboring tile. The neighboring tile should always have a matching
  // connecting type or should have the 'any' type.
  function connectSegments(segment, direction, neighbor) {
    const connectingSegment = neighbor.getSegmentWithExit(reflect(direction));
    if (connectingSegment == null) {
      throw `Cannot connect segments. There is no matching exit.`
    }

    // TODO: It might be possible for a tile with an 'any' edge to appear as a
    //       neighbor. I don't think that these tiles are part of the feature,
    //       but they need to 'close' the exit so that the feature can be
    //       completed. I need some of these 'any' tiles though before I can
    //       test and implement this.
    //
    if (segment.getType() !== connectingSegment.getType()) {
      const a = `${segment}=${segment.getType()}`;
      const b = `${connectingSegment}=${connectingSegment.getType()}`;
      throw `Connecting segments must be the same type ${a} ${b}`
    }

    const feature = FeatureDataStore.get(connectingSegment.getFeatureID());
          feature.addSegment(segment);

    // Connections are bidirectional to make graph transversal easier, but the
    // feature is essentially a bidirected graph where each node has two edges
    // in either direction.
    segment.setConnection(direction, connectingSegment);
    connectingSegment.setConnection(reflect(direction), segment);
  }

  // Currently a feature is just an array of segments. The connections between
  // segments are stored on the segments themselves, so connecting them is
  // just a matter of joining the arrays together. We create a new feature and
  // call addSegment() in a loop like this so that the segments all assign
  // themselves to the new feature.
  function mergeFeatures(featureIDs) {
    const features = featureIDs.map(id => { return FeatureDataStore.get(id) });
    const joined = Feature({});

    features.forEach(feature => {
      Object.values(feature.getSegments()).forEach(segment => {
        joined.addSegment(segment);
      });

      FeatureDataStore.remove(feature.getID());
    });

    log(`Features merged into ${joined}`,{ system:'FeatureManager', data:{
      previous: featureIDs,
      segments: Object.values(joined.getSegments()).map(seg => { return seg.toString() })
    }});
  }

  // Should this be made into a general helper function? I think rotating a
  // directional (n,s,e,w) object should be as well. Should directional be a
  // more robust object?
  function reflect(direction) {
    return { n:_s, s:_n, e:_w, w:_e }[direction];
  }

  return Object.freeze({
    tileAdded,
  });

})();
