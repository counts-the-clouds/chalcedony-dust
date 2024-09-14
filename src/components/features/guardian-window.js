global.GuardianWindow = (function() {

  function open(feature) {
    if (FeatureWindows.windowNotOpen(feature)) {
      const guardianNode = feature.getConstruction();
      const guardian = guardianNode.getGuardian();

      const casement = FeatureWindows.openCasementWith(feature, `<div class='guardian-select-window'>[Window for ${guardian}]</div>`);
      casement.setBounds(getBounds());
      casement.setBackground('rgb(15,15,15)')
      casement.setMinimumWidth(400);
    }
  }

  function getBounds() {
    const position = MouseMonitor.getPosition();
    const top = position.y - 100;
    const left = position.x - 400;
    return { top:top, left:left, height:600, width:400 }
  }

  return Object.freeze({
    open
  });

})()