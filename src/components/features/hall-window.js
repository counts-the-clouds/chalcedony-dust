global.HallWindow = (function() {

  async function open(feature) {
    const casement = FeatureWindows.openCasementWith(feature,`
      <div class='resource-window'>[HALL WINDOW]</div>`);
  }

  return Object.freeze({
    open
  });

})()