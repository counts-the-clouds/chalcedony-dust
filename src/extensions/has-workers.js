global.HasWorkers = function(data = {}) {

  let $workers = data.workers || [];
  let $slots;

  function getWorkers() { return $workers.map(id => MinionDataStore.get(id)); }
  function getWorkerIDs() { return [...$workers]; }
  function hasWorker(minion) { return $workers.indexOf(minion.getID()) >= 0; }
  function getSlotCount() { return $slots; }
  function getWorkerCount() { return $workers.length; }

  function addWorker(minion) {
    if ($workers.length < $slots) {
      return $workers.push(minion.getID());
    }
    throw `Cannot add worker, there are no slots left.`
  }

  function removeWorker(minion) {
    const index = $workers.indexOf(minion.getID());
    if (index < 0) { throw `${minion} is not in assigned worker array.` }
    $workers.splice(index, 1);
  }

  // ===========================================================================

  function pack() {
    return {
      workers: $workers,
    };
  }

  function attach(model) {
    const data = model.getWorkerConfiguration();

    // TODO: There will be other ways to determine how many worker slots this
    //       has. The getWorkerConfiguration() should not be static, and will
    //       need to calculate the number of slots available depending on the
    //       feature size and various game flags and such. Having it return
    //       static data from the registry is fine for now.
    $slots = data.slots;

    model.getWorkers = getWorkers;
    model.getWorkerIDs = getWorkerIDs;
    model.hasWorker = hasWorker;
    model.getSlotCount = getSlotCount;
    model.getWorkerCount = getWorkerCount;
    model.addWorker = addWorker;
    model.removeWorker = removeWorker;
  }

  return Object.freeze({
    pack,
    attach,
  });
}
