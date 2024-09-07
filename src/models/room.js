global.Room = function(data) {
  const roomData = RoomRegistry.lookup(data.code);
  const $id = data.id || RoomDataStore.nextID();
  const $featureID = data.featureID;

  let $code = data.code;
  let $isLair;

  Validate.exists('Display Name',roomData.displayName,`Room[${data.code}] has no display name`);
  Validate.exists('View',roomData.view,`Room[${data.code}] has no view`);
  Validate.exists('Feature ID',$featureID);

  function getID() { return $id; }
  function getCode() { return $code; }
  function getFeature() { return FeatureDataStore.get($featureID); }

  function isLair() { return getRoomData().isLair === true; }
  function hasWorkers() { return getRoomData().hasWorkers === true; }

  function getRoomData() { return RoomRegistry.lookup($code); }
  function getDisplayName() { return getRoomData().displayName; }
  function getView() { return getRoomData().view; }
  function getViewType() { return getView().type; }
  function getLayout() { return getView().layout; }
  function getBackground() { return getView().background; }

  function getDetails() {
    const feature = getFeature();

    return Weaver({
      size: feature.getSize()
    }).weave(getView().details);
  }

  function upgradeTo(code) {
    $code = code;

    if (isLair()) {
      $isLair = IsLair();
      $isLair.attach($self);
    }
  }

  // ===========================================================================

  function toString() {
    return `Room:${$id}[${$code}]`
  }

  function pack() {
    const packed = {
      id: $id,
      code: $code,
      featureID: $featureID,
    }

    if (isLair()) { packed.isLair = $isLair.pack(); }

    return packed;
  }

  // ===========================================================================

  const $self = {
    model: 'Room',
    getID,
    getCode,
    getFeature,
    isLair,
    hasWorkers,
    getRoomData,
    getDisplayName,
    getViewType,
    getLayout,
    getBackground,
    getDetails,
    upgradeTo,
    toString,
    pack,
  };

  if (isLair()) {
    $isLair = IsLair(data.isLair);
    $isLair.attach($self);
  }

  RoomDataStore.store($self);

  return $self;
}
