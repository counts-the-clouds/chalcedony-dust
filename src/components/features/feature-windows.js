global.FeatureWindows = (function() {

  function open(feature) {

    if (feature.getState() === FeatureState.incomplete) {
      throw `Cannot open a feature window for an incomplete feature.`
    }

    if (feature.getState() === FeatureState.complete) {
      openEmptyFeatureWindow(feature);

      const upgrades = FeatureUpgrades.availableFor(feature);
      console.log("Show Upgrades",upgrades);
      return
    }

    throw `Unexpected state for feature window: ${feature} ${feature.getState()}`;
  }

  async function openEmptyFeatureWindow(feature) {
    if (Casement.getAssociatedCasements(feature.toString()).length === 0) {
      const casement = await Casement.fromPath('views/empty-feature-window.html');
      casement.setAssociatedWith(feature.toString());
      casement.setTitle(feature.getDisplayName());
      casement.setBounds({ top:20, left:20, height:200, width:400 });
    }
  }

  return Object.freeze({
    open,
  });

})();