global.Resource = function(data) {
  const $code = data.code;
  const $id = data.id || ResourceDataStore.nextID();
  const $featureID = data.featureID;

  let $clockID = data.clockID;

  function getID() { return $id; }
  function getCode() { return $code; }
  function getData() { return ResourceRegistry.lookup($code); }
  function getResource() { return getData().resource; }
  function getDisplayName() { return getData().displayName; }
  function getView() { return getData().view; }
  function getDetails() { return getView().details; }
  function getFeature() { return FeatureDataStore.get($featureID); }
  function setClock(clock) { $clockID = clock.getID(); }
  function removeClock() { $clockID = null; }
  function getClock() { return ClockDataStore.get($clockID); }

  // TODO: There will be other ways to determine what worker slots this has.
  //       Eventually this will need to calculate the number of slots available
  //       depending on the feature size and various game flags and such.
  //
  function getSlots() {
    const config = getData().workerConfiguration;
    const slots = {};

    for (let i=0; i<config.slotCount; i++) {
      slots[`slot-${i}`] = { requiredSkill: config.requiredSkill }
    }

    return slots;
  }

  function toString() {
    return `Resource:${$id}[${$code}]`
  }

  function pack() {
    return {
      id: $id,
      code: $code,
      featureID: $featureID,
      clockID: $clockID,
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
    getFeature,
    setClock,
    removeClock,
    getClock,
    getSlots,
    toString,
    pack,
  };

  ResourceDataStore.store($self);

  return $self;
}
