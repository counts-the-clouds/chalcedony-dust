global.WorkstationWindow = (function() {

  function open(feature) {
    if (FeatureWindows.windowNotOpen(feature)) {
      const room = feature.getConstruction();

      const casement = FeatureWindows.openCasementWith(feature, build(room));
      casement.setTitle(room.getDisplayName());
      casement.setBounds(getBounds());
    }
  }

  function getBounds() {
    const position = MouseMonitor.getPosition();
    const top = position.y - 50;
    const left = position.x - 200;
    return { top, left, height:400, width:400 }
  }

  function build(room) {
    const ingredientSlots = room.getIngredientSlots();
    const workerSlots = room.getWorkerSlots();

    let html = `<div class='workstation-window'>`;

    html += `<div class='item-select-area'>`;
    ingredientSlots.forEach(slot => {
      html += ItemSelect.build({ ingredientSlot:slot });
    });
    html += `</div>`;

    html += `<ul class='worker-slots'>`
    Object.keys(workerSlots).forEach(slot => {
      html += WorkerSlot.build(room.getFeatureID(), slot, workerSlots[slot]);
    });
    html += `</ul>`;

    return html + `</div>`;
  }

  return Object.freeze({
    open
  });

})();
