global.Resource = function(data) {
  const $code = data.code;
  const $id = data.id || ResourceDataStore.nextID();
  const $featureID = data.featureID;
  const $hasWorkers = HasWorkers(data.hasWorkers);

  function getID() { return $id; }
  function getCode() { return $code; }
  function getResourceData() { return ResourceRegistry.lookup($code); }
  function getWorkerConfiguration() { return getResourceData().workerConfiguration }
  function getFeature() { return FeatureDataStore.get($featureID); }

  function toString() {
    return `Resource:${$id}[${$code}]`
  }

  function pack() {
    return {
      id: $id,
      code: $code,
      featureID: $featureID,
      hasWorkers: $hasWorkers.pack(),
    }
  }

  const $self = {
    model: 'Resource',
    getID,
    getCode,
    getWorkerConfiguration,
    getFeature,
    toString,
    pack,
  };

  $hasWorkers.attach($self);

  ResourceDataStore.store($self);

  return $self;
}
