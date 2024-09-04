global.FeatureWindows = (function() {

  async function open(feature) {
    if ([FeatureState.building, FeatureState.incomplete].includes(feature.getState())) {
      return false;
    }

    if (feature.getType() === TileType.node) {
      // If a guardian hasn't been selected.
      return GuardianSelectWindow.open(feature);
    }

    if (feature.getType() === TileType.resource) {
      return ResourceWindow.open(feature);
    }

    if (feature.getType() === TileType.room) {
      if (feature.getState() === FeatureState.complete) { return await EmptyFeatureWindow.open(feature); }
      if (feature.getState() === FeatureState.constructed) {
        switch(feature.getConstruction().getViewType()) {
          case 'simple': return SimpleWindow.open(feature);
          case 'upgrade-base': return UpgradeBaseWindow.open(feature);
          default: throw `TODO: Open window for view type: ${feature.getConstruction().getViewType()}`;
        }
      }
    }

    if (feature.getType() === TileType.hall) {
      if (feature.getState() === FeatureState.complete) { return await EmptyFeatureWindow.open(feature); }
      if (feature.getState() === FeatureState.constructed) { return await HallWindow.open(feature); }
    }

    throw `Unexpected state for feature ${feature} [${feature.getType()}/${feature.getState()}]`
  }

  function openCasementWith(feature, content, options={}) {
    if (Casement.getAssociatedCasements(feature.toString()).length === 0) {
      const casement = Casement.fromString(content, options);
      casement.setAssociatedWith(feature.toString());
      casement.setTitle(feature.getDisplayName());
      return casement;
    }
  }

  // === Empty Feature Window ==================================================

  return Object.freeze({
    open,
    openCasementWith,
  });

})();