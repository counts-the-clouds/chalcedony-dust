global.HasWorkers = function(data = {}) {

  let $workers = data.workers || {};
  let $slots;

  function getSlotCount() { return $slots; }

  function getWorkerMap() { return {...$workers} }

  function setWorker(slot, minion) {
    if (typeof slot !== 'number') { throw `Slot should be a number` }
    if (slot < 0 || slot > $slots) { throw `Slot should be between 0 and ${slots}` }
    $workers[slot] = minion.getID();
  }

  function removeWorker(slot) {
    if ($workers[slot] == null) { throw `No worker at slot ${slot}` }
    delete $workers[slot];
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

    model.getSlotCount = getSlotCount;
    model.getWorkerMap = getWorkerMap;
    model.setWorker = setWorker;
    model.removeWorker = removeWorker;
  }

  return Object.freeze({
    pack,
    attach,
  });
}
