global.FeatureWindows = (function() {

  async function open(feature) {
    if (feature.getState() !== FeatureState.complete) {
      throw `Unexpected state for feature window: ${feature} ${feature.getState()}`;
    }

    if (feature.getType() === TileType.node) {
      GuardianSelectWindow.open(feature);
    }

    if (feature.getType() === TileType.resource) {
      ResourceWindow.open(feature);
    }

    if ([TileType.hall, TileType.room].includes(feature.getType())) {
      await EmptyFeatureWindow.open(feature);
    }
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