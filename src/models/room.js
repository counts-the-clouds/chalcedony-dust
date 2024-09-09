global.Room = function(data) {
  const roomData = RoomRegistry.lookup(data.code);
  const $id = data.id || RoomDataStore.nextID();
  const $featureID = data.featureID;

  let $code = data.code;
  let $clockID = data.clockID;
  let $isLair;
  let $hasWorkers;

  Validate.exists('Display Name',roomData.displayName,`Room[${data.code}] has no display name`);
  Validate.exists('View',roomData.view,`Room[${data.code}] has no view`);
  Validate.exists('Feature ID',$featureID);

  function getID() { return $id; }
  function getCode() { return $code; }
  function getFeature() { return FeatureDataStore.get($featureID); }
  function setClock(clock) { $clockID = clock.getID(); }
  function removeClock() { $clockID = null; }
  function getClock() { return ClockDataStore.get($clockID); }

  function isLair() { return getData().isLair === true; }
  function hasWorkers() { return getData().hasWorkers === true; }
  function getWorkerConfiguration() { return getData().workerConfiguration; }

  function getData() { return RoomRegistry.lookup($code); }
  function getDisplayName() { return getData().displayName; }
  function getView() { return getData().view; }
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
    if (hasWorkers()) {
      $hasWorkers = HasWorkers();
      $hasWorkers.attach($self);
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
      clockID: $clockID,
    }

    if (isLair()) { packed.isLair = $isLair.pack(); }
    if (hasWorkers()) { packed.hasWorkers = $hasWorkers.pack(); }

    return packed;
  }

  // ===========================================================================

  const $self = {
    model: 'Room',
    getID,
    getCode,
    getFeature,
    setClock,
    removeClock,
    getClock,
    isLair,
    hasWorkers,
    getWorkerConfiguration,
    getData,
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
  if (hasWorkers()) {
    $hasWorkers = HasWorkers(data.hasWorkers);
    $hasWorkers.attach($self);
  }

  RoomDataStore.store($self);

  return $self;
}
