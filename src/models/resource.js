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
  function getFeatureID() { return $featureID; }
  function setClock(clock) { $clockID = clock.getID(); }
  function removeClock() { $clockID = null; }
  function getClock() { return ClockDataStore.get($clockID); }

  // TODO: There will be other ways to determine what worker slots this has.
  //       Eventually this will need to calculate the number of slots available
  //       depending on the feature size and various game flags and such.
  //
  function getWorkerSlots() {
    const assignments = MinionRoster.getAssignments($featureID);
    const workerSlots = {};

    getData().workerSlots.forEach(slot => {
      workerSlots[slot.code] = {
        name: slot.name,
        requiredSkill: slot.requiredSkill,
        assignedMinion: assignments[slot.code],
      };
    });

    return workerSlots;
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
    getFeatureID,
    setClock,
    removeClock,
    getClock,
    getWorkerSlots,
    toString,
    pack,
  };

  ResourceDataStore.store($self);

  return $self;
}
