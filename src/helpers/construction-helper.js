global.ConstructionHelper = (function() {

  // TODO: This function will also need to determine what upgrades have been
  //       unlocked, and then look through the inventories to determine if the
  //       player can afford the upgrade.
  //
  function availableFor(feature) {
    const distance = feature.distanceToOrigin();
    const size = feature.getSize();
    const type = feature.getType();

    if (feature.getState() === FeatureState.incomplete) {
      throw 'Should not be calling this for an incomplete feature.'
    }

    if (feature.getState() === FeatureState.complete) {
      const registry = Registry.forType(type);

      const available = registry.filter((code, construction) => {
        if (construction.upgradeFrom) { return false; }
        if (construction.minSize && size < construction.minSize) { return false; }
        if (construction.maxSize && size > construction.maxSize) { return false; }
        if (construction.minDistance && distance < construction.minDistance) { return false; }
        if (construction.maxDistance && distance > construction.maxDistance) { return false; }

        return true;
      });

      return Object.keys(available).map(code => {
        const clone = structuredClone(registry.lookup(code));
        clone.code = code
        clone.canAfford = true;
        return clone;
      });
    }

    // TODO: Some upgrades will follow a tree where you need to craft the
    //       previous upgrades to unlock the more advanced upgrades. These
    //       features should already be in a constructed state and the list
    //       of available features will be based on the previous construction,
    //       rather than what's available for any feature of that type.
    //
    throw `TODO: Other feature states.`
  }

  return Object.freeze({
    availableFor,
  });

})();
