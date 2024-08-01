global.Feature = function(data) {

  const $id = data.id || GameState.nextFeatureID();

  // Each feature is implemented as a graph of segments and edges that connect
  // them.
  const $segments = data.segments || {};
  const $edges = data.edges || [];

  function getID() { return $id; }
  function getSegments() { return $segments; }
  function getEdges() { return $edges; }

  // It's possible for a tile to appear more than once in the same feature.
  // Consider two unconnected rooms on a single tile that get connected by
  // tiles placed around them.
  function getTiles() {
    return ArrayHelper.unique(Object.values($segments).map(segment => segment.getTile()));
  }

  function addSegment(segment) {
    $segments[segment.toString()] = segment;
  }

  function connect(a,b) {
    $edges.push([a.toString(), b.toString()]);
  }

  return Object.freeze({
    getID,
    getSegments,
    getEdges,
    getTiles,
    addSegment,
    connect,
  });

}
