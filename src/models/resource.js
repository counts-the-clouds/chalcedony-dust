global.Resource = function(data) {

  const $code = data.code;
  const $id = data.id || ResourceDataStore.nextID();
  const $featureID = data.featureID;

  function getID() { return $id; }
  function getCode() { return $code; }
  function getFeature() { return FeatureDataStore.get($featureID); }

  function toString() {
    return `Resource:${$id}[${$code}]`
  }

  function pack() {
    return {
      id: $id,
      code: $code,
      featureID: $featureID,
    }
  }

  const $self = Object.freeze({
    model: 'Resource',
    getID,
    getCode,
    getFeature,
    toString,
    pack,
  });

  ResourceDataStore.store($self);

  return $self;
}
