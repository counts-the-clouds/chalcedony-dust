global.GuardianSelectWindow = (function() {

  async function open(feature) {
    if (FeatureWindows.windowNotOpen(feature)) {
      const guardianNode = feature.getConstruction();

      console.log("Feature:",feature.getType(),feature.getState(), feature.getConstruction());
      console.log("Choices:",guardianNode.getGuardianChoices());

      const casement = FeatureWindows.openCasementWith(feature, `
        <div class='guardian-select-window'>[GUARDIAN SELECT WINDOW]</div>`);
    }
  }

  return Object.freeze({
    open
  });

})()