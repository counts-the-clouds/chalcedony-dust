global.GuardianSelectWindow = (function() {

  async function open(feature) {
    const casement = FeatureWindows.openCasementWith(feature,`
      <div class='guardian-select-window'>[GUARDIAN SELECT WINDOW]</div>`);
  }

  return Object.freeze({
    open
  });

})()