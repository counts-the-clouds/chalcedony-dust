global.GuardianWindow = (function() {

  function open(feature) {
    if (FeatureWindows.windowNotOpen(feature)) {
      const guardianNode = feature.getConstruction();
      const guardian = guardianNode.getGuardian();

      const html = `<div class='guardian-window'>
        <div class='portrait'></div>
        <div class='header'>${guardian.getFullName()}</div>
        <div class='text'>${guardian.getWindowText()}</div>
      </div>`

      const casement = FeatureWindows.openCasementWith(feature, html);
      casement.setBounds(getBounds());
      casement.setBackground('rgb(15,15,15)')
      casement.setMinimumWidth(400);

      const content = casement.getCasementContent();
      content.querySelector('.portrait').style['background-image'] = X.assetURL(guardian.getWindowImage());
    }
  }

  function getBounds() {
    const position = MouseMonitor.getPosition();
    const top = position.y - 100;
    const left = position.x - 300;
    return { top:top, left:left, height:400, width:600 }
  }

  return Object.freeze({
    open
  });

})()