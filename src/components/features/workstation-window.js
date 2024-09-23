global.WorkstationWindow = (function() {

  function open(feature) {
    if (FeatureWindows.windowNotOpen(feature)) {
      const room = feature.getConstruction();

      const casement = FeatureWindows.openCasementWith(feature, build(room), { resizable:false, scrollingPanel:false });
      casement.setTitle(room.getDisplayName());
      casement.setBounds(getBounds());

      const workstationElement = casement.getCasementContent().querySelector('.workstation-window');
      workstationElement.style['background-image'] = X.assetURL(room.getBackground());
    }
  }

  function getBounds() {
    const position = MouseMonitor.getPosition();
    const top = position.y - 300;
    const left = position.x - 300;
    return { top, left, height:580, width:400 }
  }

  function build(room) {
    const ingredientSlots = room.getIngredientSlots();
    const workerSlots = room.getWorkerSlots();

    let html = `<div class='workstation-window'>`;

    html += `<div class='result-area'><div class='result-icon icon icon-large icon-for-unknown'></div></div>`

    html += `<div class='item-select-area'>`;
    Object.keys(ingredientSlots).forEach(slot => {
      html += ItemSelect.build({ featureID:room.getFeatureID(), slotCode:slot, onSelect:onItemSelect });
    });
    html += `</div>`;

    html += `<ul class='worker-slots'>`
    Object.keys(workerSlots).forEach(slot => {
      html += WorkerSlot.build(room.getFeatureID(), slot, workerSlots[slot]);
    });
    html += `</ul>`;

    return html + `</div>`;
  }

  function onItemSelect(selectOptions) {
    console.log(`ON SELECT:`,selectOptions);
    // const casement = Casement.getAssociatedCasements(feature.toString())[0];
    // const content = casement.getCasementContent();
  }

  return Object.freeze({
    open
  });

})();
