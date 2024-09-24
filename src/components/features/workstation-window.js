global.WorkstationWindow = (function() {

  function open(feature) {
    if (FeatureWindows.windowNotOpen(feature)) {
      const room = feature.getConstruction();
      const ingredientSlots = room.getIngredientSlots();

      const itemSelects = Object.keys(ingredientSlots).map(slot => {
        return ItemSelect({ feature:feature, slot:slot, onSelect:onItemSelect });
      });

      const casement = FeatureWindows.openCasementWith(feature, build(room), { resizable:false, scrollingPanel:false });
      casement.setTitle(room.getDisplayName());
      casement.setBounds(getBounds());

      const workstationElement = casement.getCasementContent().querySelector('.workstation-window');
      workstationElement.style['background-image'] = X.assetURL(room.getBackground());

      const itemSelectArea = workstationElement.querySelector('.item-select-area');
      itemSelects.forEach(itemSelect => { itemSelectArea.appendChild(itemSelect.build()); })

      updateResultArea(feature);
    }
  }

  function getBounds() {
    const position = MouseMonitor.getPosition();
    const top = position.y - 300;
    const left = position.x - 300;
    return { top, left, height:580, width:400 }
  }

  function build(room) {
    const workerSlots = room.getWorkerSlots();

    const workerSlotList = Object.keys(workerSlots).map(slot => {
      return WorkerSlot.build(room.getFeatureID(), slot, workerSlots[slot]);
    }).join('');

    return `<div class='workstation-window'>
      <div class='result-area'></div>
      <div class='item-select-area'></div>
      <ul class='worker-slots'>${workerSlotList}</ul>
    </div>`;
  }

  function updateResultArea(feature) {
    const workstation = feature.getConstruction()
    const casement = Casement.getAssociatedCasements(feature.toString())[0];
    const resultArea = casement.getCasementContent().querySelector('.result-area');
    const recipe = workstation.determineCurrentRecipe();

    let resultIcon;

    if (recipe == null) {
      resultIcon = X.createElement(`<div class='result-icon icon icon-large icon-for-unknown'></div>`)
    }

    resultArea.innerHTML = '';
    resultArea.appendChild(resultIcon);
  }

  function onItemSelect(selectOptions) {
    const feature = selectOptions.feature;
    const workstation = feature.getConstruction()
    workstation.setIngredient(selectOptions.slot, selectOptions.code);
    updateResultArea(feature);
  }

  return Object.freeze({
    open
  });

})();
