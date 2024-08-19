global.ResourceWindow = (function() {

  async function open(feature) {
    const casement = await FeatureWindows.openCasementFor(feature,'views/resource-window.html');
  }

  return Object.freeze({
    open
  });

})()