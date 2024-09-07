global.Resource = function(data) {
  const $code = data.code;
  const $id = data.id || ResourceDataStore.nextID();
  const $featureID = data.featureID;
  const $hasWorkers = HasWorkers(data.hasWorkers);

  function getID() { return $id; }
  function getCode() { return $code; }
  function getResourceData() { return ResourceRegistry.lookup($code); }
  function getDisplayName() { return getResourceData().displayName; }
  function getView() { return getResourceData().view; }
  function getDetails() { return getView().details; }
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
    getDisplayName,
    getView,
    getDetails,
    getWorkerConfiguration,
    getFeature,
    toString,
    pack,
  };

  $hasWorkers.attach($self);

  ResourceDataStore.store($self);

  return $self;
}
