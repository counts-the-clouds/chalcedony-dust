global.Segment = function(data) {

  const $tileID = data.tileID;
  const $index = data.index;
  const $id = data.id || SegmentDataStore.nextID();

  const $type = data.segmentData ? data.segmentData.type : data.type;
  const $staticExits = data.segmentData ? data.segmentData.exits : (data.exits || []);
  const $graphics = data.segmentData ? data.segmentData.graphics : data.graphics;

  Validate.exists('tileID',$tileID);
  Validate.exists('index',$index);
  Validate.exists('type',$type);
  Validate.exists('graphics',$graphics);

  let $featureID = data.featureID;
  let $connections = data.connections || {};

  // ===========================================================================

  function getID() { return $id; }
  function getTileID() { return $tileID; }
  function getType() { return $type }
  function getGraphics() { return $graphics; }
  function getTile() { return TileDataStore.get($tileID); }
  function getIndex() { return $index; }

  function getFeatureID() { return $featureID; }
  function setFeatureID(featureID) { $featureID = featureID; }
  function getFeature() { return FeatureDataStore.get($featureID); }
  function getState() { return $featureID ? getFeature().getState() : _incomplete }

  function getConnections() { return $connections }
  function getConnection(direction) { return $connections[direction]; }

  function setConnection(direction, segment) {
    $connections[direction] = { tileID:segment.getTileID(), index:segment.getIndex() }
  }

  // We only store a tile's rotation value on the tile, and keep the rotation
  // of the segment's exits static. We only apply the tile's rotation when we
  // need to access the segment's exits.
  function getExits(rotation=0) {
    if (rotation === 0) { return $staticExits }

    return $staticExits.map(direction => {
      return {
        1:{ n:_e, s:_w, e:_s, w:_n },
        2:{ n:_s, s:_n, e:_w, w:_e },
        3:{ n:_w, s:_e, e:_n, w:_s },
      }[rotation][direction];
    });
  }

  function shouldBeComplete() {

    // The core and resource nodes are always complete.
    if (getType() === TileType.core) { return true; }
    if (getType() === TileType.resource) { return true; }

    // A node segment is complete when all the other segments on this tile are
    // complete.
    if (getType() === TileType.node) {
      for (const feature of getTile().getFeatures()) {
        if (feature.getID() !== $featureID && feature.isNotIncomplete() === false) { return false; }
      }
      return true;
    }

    // Otherwise the segment is complete when all the exits are connected.
    for (const exit of getExits(getTile().getRotation())) {
      if (getConnection(exit) == null) { return false; }
    }
    return true;
  }

  function toString() {
    return `Segment:${$id}`
  }

  function pack() {
    return {
      id: $id,
      tileID: $tileID,
      type: $type,
      exits: $staticExits,
      graphics: $graphics,
      index: $index,
      featureID: $featureID,
      connections: $connections,
    };
  }

  // ===========================================================================

  const $self = Object.freeze({
    getID,
    getTileID,
    getType,
    getGraphics,
    getTile,
    getIndex,
    getFeatureID,
    setFeatureID,
    getFeature,
    getState,
    getConnections,
    getConnection,
    setConnection,
    getExits,
    shouldBeComplete,
    toString,
    pack,
  });

  SegmentDataStore.store($self);

  return $self;
}
