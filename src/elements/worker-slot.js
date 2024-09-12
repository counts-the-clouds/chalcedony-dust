global.WorkerSlot = (function() {

  function init() {
    X.onClick('li.slot-select', openSelect);
  }

  function build(featureID, slot, slotData) {
    console.log(`Building Worker Slot ${slot}`, slotData);

    let minionName = `<div class='empty'>Assign Minion</div>`
    let minionSkill = ``

    if (slotData.assignedMinion) {
      const minion = Minion(slotData.assignedMinion);
      minionName = `<div class='minion-name'>${minion.getName()}</div>`;

      if (slotData.requiredSkill) {
        minionSkill = minion.hasSkill(slotData.requiredSkill) ?
          `<div class='minion-skill positive'>+${minion.getSkill(slotData.requiredSkill)}</div>` :
          `<div class='minion-skill none'>0</div>`;
      }
    }

    return `<li class='worker-slot' data-feature-id='${featureID}' data-slot='${slot}'>
      <div class='slot-name'>${slotData.name}</div>
      <div class='slot-select'>${minionName}${minionSkill}</div>
    </li>`
  }

  function openSelect(event) {
    const slotItem = event.target.closest('li.worker-slot')
    console.log("Click Slot Item:",slotItem);
  }

  return Object.freeze({
    init,
    build,
  });

})()