global.WorkerSlot = (function() {

  function init() {
    X.onClick('li.worker-slot', openSelect);
  }

  function build(featureID, slot, slotData) {
    console.log(`Building Worker Slot ${slot}`,slotData);

    const isEmpty = slotData.assignedMinion == null;
    const name = isEmpty ? 'Assign Minion' : Minion(slotData.assignedMinion).getName();
    const classname = isEmpty ? 'empty' : '';

    return `<li class='worker-slot ${classname}' data-feature-id='${featureID}' data-slot='${slot}'>${name}</li>`
  }

  function openSelect(event) {
    const slotItem = event.target.closest('li.worker-slot')
    console.log("Click Slot Item:",slotItem);
  }

  return Object.freeze({
    init,
    build,
  })

})()