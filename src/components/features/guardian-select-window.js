global.GuardianSelectWindow = (function() {

  async function open(feature) {
    const casement = await FeatureWindows.openCasementFor(feature,'views/guardian-select-window.html');
  }

  return Object.freeze({
    open
  });

})()