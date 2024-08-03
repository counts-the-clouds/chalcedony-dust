global.TileSegment = function(tile,data) {

  const $tile = tile;
  const $index = data.index;
  const $form = data.form || (getExits().length === 0 ? _base : _incomplete);

  let $featureID = data.featureID;
  let $connections = data.connections || {};

  function getTile() { return $tile; }
  function getIndex() { return $index; }
  function getForm() { return $form; }

  function getFeatureID() { return $featureID; }
  function setFeatureID(featureID) { $featureID = featureID; }

  function getConnections() { return $connections }
  function getConnection(direction) { return $connections[direction]; }

  function setConnection(direction, segment) {
    $connections[direction] = { tile:segment.getTile().getID(), index:segment.getIndex() }
  }

  function getSegmentData() { return TileRegistry.lookup($tile.getCode()).segments[$index] }
  function getType() { return getSegmentData().type; }

  // The exits come from the immutable segment data, so they won't be rotated
  // like the tile's edges object. We don't want to always rotate these values
  // because the tile rotates the edges, and if we rotate the exits then the
  // tile's edges might get rotated twice. This is used by the FeatureManager
  // though to get the neighboring tiles of a segment, so it needs to fetch a
  // rotated version of that array then.
  function getExits(rotation=0) {
    const exits = getSegmentData().exits;
    if (rotation === 0) { return exits }

    return exits.map(direction => {
      return {
        1:{ n:_e, s:_w, e:_s, w:_n },
        2:{ n:_s, s:_n, e:_w, w:_e },
        3:{ n:_w, s:_e, e:_n, w:_s },
      }[rotation][direction];
    });
  }

  function toString() {
    return `Segment[${tile.getID()}:${$index}]`
  }

  function pack() {
    return {
      index: $index,
      form: $form,
      featureID: $featureID,
    };
  }

  return Object.freeze({
    getTile,
    getIndex,
    getForm,
    getFeatureID,
    setFeatureID,
    getConnections,
    getConnection,
    setConnection,
    getSegmentData,
    getType,
    getExits,
    toString,
    pack,
  });
}
