global.Room = function(data) {
  const $id = data.id || RoomDataStore.nextID();
  const $featureID = data.featureID;

  let $code = data.code;
  let $clockID = data.clockID;

  Validate.exists('Feature ID',$featureID);

  function getID() { return $id; }
  function getCode() { return $code; }
  function getFeature() { return FeatureDataStore.get($featureID); }
  function getFeatureID() { return $featureID; }
  function setClock(clock) { $clockID = clock.getID(); }
  function removeClock() { $clockID = null; }
  function getClock() { return ClockDataStore.get($clockID); }

  function getData() { return RoomRegistry.lookup($code); }
  function getDisplayName() { return getData().displayName; }
  function getView() { return getData().view; }
  function getViewType() { return getView().type; }
  function getLayout() { return getView().layout; }
  function getBackground() { return getView().background; }

  function getDetails() {
    let text = getView().details;
    const size = getFeature().getSize();

    if (getData().lair) {
      const minion = Minion(getData().lair);
      const count = minion.getMinionCountForSize(size);
      const name = minion.getPluralName();
      text += ` ${count} ${name} have made their home here.`;
    }

    return Weaver({ size }).weave(text);
  }

  function upgradeTo(code) {
    $code = code;

    const minionCode = getData().lair;
    if (minionCode) {
      MinionRoster.registerLair($featureID, minionCode, getFeature().getSize());
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
    getFeatureID,
    setClock,
    removeClock,
    getClock,
    getData,
    getDisplayName,
    getView,
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
