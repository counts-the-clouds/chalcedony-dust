global.Resource = function(data) {
  const $code = data.code;
  const $id = data.id || ResourceDataStore.nextID();
  const $featureID = data.featureID;
  const $hasWorkers = HasWorkers(data.hasWorkers);

  let $clockID = data.clockID;

  function getID() { return $id; }
  function getCode() { return $code; }
  function getData() { return ResourceRegistry.lookup($code); }
  function getResource() { return getData().resource; }
  function getDisplayName() { return getData().displayName; }
  function getView() { return getData().view; }
  function getDetails() { return getView().details; }
  function getWorkerConfiguration() { return getData().workerConfiguration }
  function getFeature() { return FeatureDataStore.get($featureID); }
  function setClock(clock) { $clockID = clock.getID(); }
  function removeClock() { $clockID = null; }
  function getClock() { return ClockDataStore.get($clockID); }

  function toString() {
    return `Resource:${$id}[${$code}]`
  }

  function pack() {
    return {
      id: $id,
      code: $code,
      featureID: $featureID,
      clockID: $clockID,
      hasWorkers: $hasWorkers.pack(),
    }
  }

  const $self = {
    model: 'Resource',
    getID,
    getCode,
    getData,
    getResource,
    getDisplayName,
    getView,
    getDetails,
    getWorkerConfiguration,
    getFeature,
    setClock,
    removeClock,
    getClock,
    toString,
    pack,
  };

  $hasWorkers.attach($self);

  ResourceDataStore.store($self);

  return $self;
}
