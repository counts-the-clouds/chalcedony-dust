global.ResourceWindow = (function() {

  async function open(feature) {
    if (FeatureWindows.windowNotOpen(feature)) {
      const casement = FeatureWindows.openCasementWith(feature, `
        <div class='resource-window'>[RESOURCE WINDOW]</div>`);
    }
  }

  return Object.freeze({
    open
  });

})()