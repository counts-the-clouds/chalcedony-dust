global.Segment = function(data) {

  Validate.exists('tileID',data.tileID);
  Validate.exists('tileCode',data.tileCode);
  Validate.exists('index',data.index);

  const $tileID = data.tileID;
  const $tileCode = data.tileCode;
  const $index = data.index;
  const $id = data.id || SegmentDataStore.nextID();

  // If a segment doesn't have any exits it's in a completed state when placed.
  let $state = data.state || (getExits().length === 0 ? _complete : _incomplete);

  let $featureID = data.featureID;
  let $connections = data.connections || {};

  // ===========================================================================

  function getID() { return $id; }
  function getTileID() { return $tileID; }
  function getTileCode() { return $tileCode; }
  function getTile() { return TileDataStore.get($tileID); }
  function getIndex() { return $index; }
  function getState() { return $state; }
  function setState(state) { $state = state; }

  function getFeatureID() { return $featureID; }
  function setFeatureID(featureID) { $featureID = featureID; }
  function getFeature() { return FeatureDataStore.get($featureID); }

  function getConnections() { return $connections }
  function getConnection(direction) { return $connections[direction]; }

  function setConnection(direction, segment) {
    $connections[direction] = { tileID:segment.getTileID(), index:segment.getIndex() }
  }

  function getSegmentData() { return TileRegistry.lookup($tileCode).segments[$index] }
  function getType() { return getSegmentData().type; }

  // The exits come from the immutable segment data, so they won't be rotated
  // like the tile's edges object. We don't want to always rotate these values
  // because the tile rotates the edges, and if we rotate the exits then the
  // tile's edges might get rotated twice. This is used by the FeatureLibrary
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

  function isComplete() {
    for (const exit of getExits(getTile().getRotation())) {
      if (getConnection(exit) == null) { return false; }
    }
    return true;
  }

  function getGraphics() {
    const palette = ExtraRegistry.lookup('ColorPalette');
    const graphicsData = getSegmentData().graphics[$state];
    const type = getType();

    const graphics = {
      segmentID: $id,
      texture: graphicsData.texture,
      style: graphicsData.style || _singleTexture,
    };

    if ($state === _incomplete) {
      const colors = palette.segments[_incomplete];
      graphics.color = colors[type];
    }
    if ($state === _complete) {
      const colors = palette.segments[_complete];
      graphics.groundColor = colors[type].ground;
      graphics.wallColor = colors[type].wall;
    }

    if (graphicsData.angle) {
      graphics.angle = graphicsData.angle;
    }

    return graphics
  }

  function toString() {
    return `Segment:${$id}`
  }

  function pack() {
    return {
      id: $id,
      tileID: $tileID,
      tileCode: $tileCode,
      index: $index,
      state: $state,
      featureID: $featureID,
      connections: $connections,
    };
  }

  // ===========================================================================

  const $self = Object.freeze({
    getID,
    getTileID,
    getTileCode,
    getTile,
    getIndex,
    getState,
    setState,
    getFeatureID,
    setFeatureID,
    getFeature,
    getConnections,
    getConnection,
    setConnection,
    getSegmentData,
    getType,
    getExits,
    isComplete,
    getGraphics,
    toString,
    pack,
  });

  SegmentDataStore.store($self);

  return $self;

}
