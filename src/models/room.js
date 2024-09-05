global.Room = function(data) {
  const roomData = RoomRegistry.lookup(data.code);
  const $id = data.id || RoomDataStore.nextID();
  const $featureID = data.featureID;
  let $code = data.code;

  Validate.exists('View',roomData.view,`Room[${data.code}] has no view`);
  Validate.exists('Display Name',roomData.displayName,`Room[${data.code}] has no display name`);
  Validate.exists('Feature ID',$featureID);

  function getID() { return $id; }
  function getCode() { return $code; }
  function getFeature() { return FeatureDataStore.get($featureID); }

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

  function getLairData() {
    const data = getRoomData().lair;
    if (data == null) { throw `This room has no lair data.` }
    return data;
  }

  // TODO: Surely other things may need to change when a room is upgraded from
  //       one type to another. Rooms have minions assigned to them, they can
  //       have items in their processing queues. I suppose we should always
  //       'expand' what a room can have when upgrading. If we go from having
  //       assigned minions to no assigned minions that could be a big problem.
  function upgradeTo(code) { $code = code; }

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
    getViewType,
    getLayout,
    getBackground,
    getDetails,
    getLairData,
    upgradeTo,
    toString,
    pack,
  };

  RoomDataStore.store($self);

  return Object.freeze($self);
}
