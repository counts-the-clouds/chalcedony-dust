global.Hall = function(data) {

  const $code = data.code;
  const $id = data.id || HallDataStore.nextID();
  const $featureID = data.featureID;

  function getID() { return $id; }
  function getCode() { return $code; }
  function getFeature() { return FeatureDataStore.get($featureID); }

  function toString() {
    return `Hall:${$id}[${$code}]`
  }

  function pack() {
    return {
      id: $id,
      code: $code,
      featureID: $featureID,
    }
  }

  const $self = Object.freeze({
    getID,
    getCode,
    getFeature,
    toString,
    pack,
  });

  HallDataStore.store($self);

  return $self;
}
