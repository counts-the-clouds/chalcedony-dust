global.ResourceWindow = (function() {

  async function open(feature) {
    const casement = FeatureWindows.openCasementWith(feature,`
      <div class='resource-window'>[RESOURCE WINDOW]</div>`);
  }

  return Object.freeze({
    open
  });

})()