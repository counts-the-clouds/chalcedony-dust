global.ResourceWindow = (function() {

  async function open(feature) {
    if (FeatureWindows.windowNotOpen(feature)) {
      const resource = feature.getConstruction();

      const casement = FeatureWindows.openCasementWith(feature,build(resource),{ resizable:false });
      casement.setTitle(resource.getDisplayName());
      casement.setBounds(getBounds(resource));
      casement.setBackground('rgb(17,17,19)');

      const content = casement.getCasementContent();
      content.querySelector('.has-background').style['background-image'] = X.assetURL(resource.getView().background);
    }
  }

  function build(resource) {
    let html = `<div class='resource-window'>
      <div class='banner has-background'></div>
      <div class='icon-container'><div class='icon icon-for-${resource.getResource()}'></div></div>
      <div class='header'>${resource.getDetails()}</div>
      <ul class='slots'>`;

    const slots = resource.getWorkerSlots();
    Object.keys(slots).forEach(slot => {
      html += WorkerSlot.build(resource.getFeatureID(), slot, slots[slot]);
    });

    return `${html}</ul></div>`;
  }

  function getBounds(resource) {
    const position = MouseMonitor.getPosition();
    const slotHeight = Object.keys(resource.getWorkerSlots()).length * 40;

    const top = position.y - 50;
    const left = position.x - 200;
    return { top, left, height:(220+slotHeight), width:400 }
  }

  return Object.freeze({
    open
  });

})();
