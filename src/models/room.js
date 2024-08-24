global.Room = function(data) {
  const roomData = RoomRegistry.lookup(data.code);

  const $code = data.code;
  const $id = data.id || RoomDataStore.nextID();
  const $featureID = data.featureID;

  const $displayName = roomData.displayName;
  const $casementInfo = roomData.casement;

  function getID() { return $id; }
  function getCode() { return $code; }
  function getFeature() { return FeatureDataStore.get($featureID); }

  function getDisplayName() { return $displayName; }
  function getLayout() { return $casementInfo.layout; }
  function getBackground() { return $casementInfo.background; }

  function getDetails() {
    const feature = getFeature();

    return Weaver({
      size:feature.getSize()
    }).weave($casementInfo.details);
  }

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
    getDisplayName,
    getLayout,
    getBackground,
    getDetails,
    toString,
    pack,
  };

  RoomDataStore.store($self);

  return Object.freeze($self);
}
