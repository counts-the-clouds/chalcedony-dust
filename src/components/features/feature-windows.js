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
    if ([TileType.hall, TileType.room].includes(feature.getType())) {
      if (feature.getState() === FeatureState.complete) { return await EmptyFeatureWindow.open(feature); }
      if (feature.getState() === FeatureState.constructed) { return console.log("Open Construction Window...") }
    }

    throw `Unexpected state for feature ${feature} [${feature.getType()}/${feature.getState()}]`
  }

  async function openCasementFor(feature, viewPath) {
    if (Casement.getAssociatedCasements(feature.toString()).length === 0) {
      const casement = await Casement.fromPath(viewPath);
      casement.setAssociatedWith(feature.toString());
      casement.setTitle(feature.getDisplayName());
      return casement;
    }
  }

  // === Empty Feature Window ==================================================

  return Object.freeze({
    open,
    openCasementFor,
  });

})();