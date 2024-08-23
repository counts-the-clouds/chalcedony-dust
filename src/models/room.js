global.Room = function(data) {
  const $code = data.code;
  const $id = data.id || RoomDataStore.nextID();
  const $featureID = data.featureID;
  const $hasItems = HasItems(data.hasItems);

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
      hasItems: $hasItems.pack(),
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

  $hasItems.attach($self);

  RoomDataStore.store($self);

  return Object.freeze($self);
}
