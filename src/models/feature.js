global.Feature = function(data) {

  const $id = data.id || GameState.nextFeatureID();

  // Each feature is implemented as a graph of segments and edges that connect
  // them.
  const $segments = data.segments || {};
  const $edges = data.edges || {};

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
    segment.setFeatureID($id);
    $segments[segment.toString()] = segment;
    $edges[segment.toString()] = [];
  }

  function connect(a,b) {
    $edges[a.toString()].push(b.toString());
  }

  function search(start) {
    if (start == null) {
      start = Object.keys($segments)[0];
    }

    const result = [];
    const visited = {};

    const dfs = vertex => {
      if (!vertex) { return null; }

      visited[vertex] = true;
      result.push(vertex);

      $edges[vertex].forEach(segmentID => {
        if (!visited[segmentID]) {
          return dfs(segmentID);
        }
      });
    }

    dfs(start);

    return result;
  }

  function toString() {
    return `Feature[${$id}]`;
  }

  return Object.freeze({
    getID,
    getSegments,
    getEdges,
    getTiles,
    addSegment,
    connect,
    search,
    toString,
  });

}
