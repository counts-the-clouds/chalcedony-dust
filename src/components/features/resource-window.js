global.ResourceWindow = (function() {

  async function open(feature) {
    if (FeatureWindows.windowNotOpen(feature)) {
      const resource = feature.getConstruction();

      const casement = FeatureWindows.openCasementWith(feature,build(resource));
      casement.setTitle(resource.getDisplayName());
      casement.setBounds(getBounds());
      casement.setBackground('rgb(17,17,19)');

      const content = casement.getCasementContent();
      content.querySelector('.has-background').style['background-image'] = X.assetURL(resource.getView().background);
      content.querySelector('.worker-area').appendChild(WorkerControl.build(feature));
    }
  }

  function build(resource) {
    const view = resource.getView();
    return `<div class='resource-window'>
      <div class='banner has-background'></div>
      <div class='icon-container'><div class='icon icon-for-${view.resourceIcon}'></div></div>
      <div class='header'>${resource.getDetails()}</div>
      <div class='worker-area'></div>
    </div>`
  }

  function getBounds() {
    const position = MouseMonitor.getPosition();
    const top = position.y - 50;
    const left = position.x - 150;
    return { top, left, height:400, width:300 }
  }


  return Object.freeze({
    open
  });

})()