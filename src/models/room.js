global.Room = function(data) {
  const roomData = RoomRegistry.lookup(data.code);

  const $code = data.code;
  const $id = data.id || RoomDataStore.nextID();
  const $featureID = data.featureID;

  const $displayName = roomData.displayName;
  const $view = roomData.view;

  Validate.exists('Feature ID',$featureID);
  Validate.exists('Display Name',$displayName);
  Validate.exists('View',$view);

  function getID() { return $id; }
  function getCode() { return $code; }
  function getFeature() { return FeatureDataStore.get($featureID); }

  function getDisplayName() { return $displayName; }
  function getView() { return $view; }
  function getViewType() { return $view.type; }
  function getLayout() { return $view.layout; }
  function getBackground() { return $view.background; }

  function getDetails() {
    const feature = getFeature();

    return Weaver({
      size: feature.getSize()
    }).weave($view.details);
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
    getView,
    getViewType,
    getLayout,
    getBackground,
    getDetails,
    toString,
    pack,
  };

  RoomDataStore.store($self);

  return Object.freeze($self);
}
