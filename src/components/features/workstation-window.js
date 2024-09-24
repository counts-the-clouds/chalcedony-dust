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
    return { top, left, height:625, width:400 }
  }

  function build(room) {
    const workerSlots = room.getWorkerSlots();

    const workerSlotList = Object.keys(workerSlots).map(slot => {
      return WorkerSlot.build(room.getFeatureID(), slot, workerSlots[slot]);
    }).join('');

    return `<div class='workstation-window'>
      <div class='arcane-icons'></div>
      <div class='result-area'><div class='result-icon'></div></div>
      <div class='item-select-area'></div>
      <ul class='worker-slots'>${workerSlotList}</ul>
      <div class='commands'>
        <a href='#' class='build-once-button button button-primary disabled'>Build Once</a>
        <a href='#' class='build-repeat-button button button-primary disabled'>Build on Repeat</a>
        <a href='#' class='stop-build-button button button-danger hide'>Stop</a>
      </div>
    </div>`;
  }

  // TODO: We update this area when the ingredients are changed, but we also
  //       need to update when a worker is changed.
  function updateResultArea(feature) {
    const workstation = feature.getConstruction()
    const casement = Casement.getAssociatedCasements(feature.toString())[0];
    const content = casement.getCasementContent();
    const resultIcon = content.querySelector('.result-icon');
    const arcaneIcons = content.querySelector('.arcane-icons');
    const recipe = workstation.determineCurrentRecipe();

    arcaneIcons.innerHTML = '';
    arcaneIcons.appendChild(X.createElement(AspectPanel.build(workstation.getArcaneTotals())));

    if (recipe == null) {
      resultIcon.setAttribute('class','result-icon icon icon-large icon-for-unknown');
    }
  }

  function onItemSelect(selectOptions) {
    const feature = selectOptions.feature;
    const workstation = feature.getConstruction();
    workstation.setIngredient(selectOptions.slot, selectOptions.code);
    updateResultArea(feature);
  }

  return Object.freeze({
    open
  });

})();
