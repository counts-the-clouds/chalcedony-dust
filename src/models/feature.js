global.Feature = function(data) {

  const $id = data.id || GameState.nextFeatureID();
  const $segments = data.segments || {};

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
    $segments[segment.toString()] = segment;
  }

  function getSegmentByName(name) {
    return $segments[name];
  }

  // This key string comes from the Segment.toString() function.
  function getSegmentByTile(tile, index=0) {
    return $segments[`Segment[${tile.getID()}:${index}]`];
  }

  function toString() {
    return `Feature[${$id}]`;
  }

  return Object.freeze({
    getID,
    getSegments,
    getTiles,
    addSegment,
    getSegmentByName,
    getSegmentByTile,
    toString,
  });

}
