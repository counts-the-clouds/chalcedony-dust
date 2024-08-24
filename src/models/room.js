global.Room = function(data) {
  const $code = data.code;
  const $id = data.id || RoomDataStore.nextID();
  const $featureID = data.featureID;

  function getID() { return $id; }
  function getCode() { return $code; }
  function getFeature() { return FeatureDataStore.get($featureID); }

  // ===========================================================================

  function toString() {
    return `Room:${$id}[${$code}]`
  }

  function pack() {
    return {
      id: $id,
      code: $code,
      featureID: $featureID,
    }
  }

  // ===========================================================================

  const $self = {
    model: 'Room',
    getID,
    getCode,
    getFeature,
    toString,
    pack,
  };

  RoomDataStore.store($self);

  return Object.freeze($self);
}
