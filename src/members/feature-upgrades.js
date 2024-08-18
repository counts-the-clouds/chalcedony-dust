global.FeatureUpgrades = (function() {

  // TODO: This function will need to determine what upgrades have been
  //       unlocked, and which upgrades are appropriate for the feature given
  //       its size and distance from the origin. It will also need to look
  //       through the inventories to determine if the player can afford the
  //       upgrade. For now we're just faking all this though.
  function availableFor(feature) {
    const distance = feature.distanceToOrigin();
    const size = feature.getSize();

    console.log(`Check Distance[${distance}] Size[${size}]`);

    if (feature.getState() === FeatureState.incomplete) {
      throw 'Should not be calling this for an incomplete feature.'
    }
    if (feature.getState() === FeatureState.complete) {
      const available = FeatureUpgradeRegistry.allCodes().filter(code => {
        const upgrade = FeatureUpgradeRegistry.lookup(code);

        // TODO: Some upgrades will follow a tree where you need to craft the
        //       previous upgrades to unlock the more advanced upgrades. Need
        //       to have any upgrades working first though.
        if (upgrade.upgradeFrom) { return false; }

        if (upgrade.featureType !== feature.getType()) { return false; }
        if (upgrade.minSize && size < upgrade.minSize) { return false; }
        if (upgrade.maxSize && size > upgrade.maxSize) { return false; }

        return true;
      });

      return available.map(code => {
        return { code:code, canAfford:true };
      });
    }

  }

  return Object.freeze({
    availableFor,
  });

})();