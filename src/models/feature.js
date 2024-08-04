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
    // TODO: Check Status
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
