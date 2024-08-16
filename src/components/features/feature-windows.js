global.FeatureWindows = (function() {

  function open(feature) {

    if (feature.getState() === FeatureState.incomplete) {
      throw `Cannot open a feature window for an incomplete feature.`
    }

    if (feature.getState() === FeatureState.complete) {
      return openEmptyFeatureWindow(feature);
    }

    throw `Unexpected state for feature window: ${feature} ${feature.getState()}`;
  }

  function close() {

  }

  function isVisible() {

  }

  async function openEmptyFeatureWindow(feature) {
    const casement = await Casement.fromPath('views/empty-feature-window.html');
    casement.setTitle(feature.getDisplayName());
    casement.setBounds({ top:20, left:20, height:200, width:400 });
  }



  return Object.freeze({
    open,
    close,
    isVisible,
  });

})();