global.Room = function(data) {
  const $id = data.id || RoomDataStore.nextID();
  const $featureID = data.featureID;

  let $code = data.code;
  let $clockID = data.clockID;

  Validate.exists('Feature ID',$featureID);

  function getID() { return $id; }
  function getCode() { return $code; }
  function getFeature() { return FeatureDataStore.get($featureID); }
  function setClock(clock) { $clockID = clock.getID(); }
  function removeClock() { $clockID = null; }
  function getClock() { return ClockDataStore.get($clockID); }

  function getData() { return RoomRegistry.lookup($code); }
  function getLair() { return getData().lair; }
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

    const minionCode = getLair();
    if (minionCode) {
      MinionRoster.registerLair(getID(), minionCode, getFeature().getSize());
    }
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
      clockID: $clockID,
    };
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
    getData,
    getLairData,
    getDisplayName,
    getViewType,
    getLayout,
    getBackground,
    getDetails,
    upgradeTo,
    toString,
    pack,
  };

  RoomDataStore.store($self);

  return $self;
}
