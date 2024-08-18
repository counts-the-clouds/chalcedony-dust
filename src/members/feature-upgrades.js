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

        if (upgrade.featureType !== feature.getType()) { return false; }

        return true;
      });

      return available.map(code => {
        const upgrade = FeatureUpgradeRegistry.lookup(code);

        return {
          code: code,
          displayName: upgrade.displayName,
          cost: [...upgrade.cost],
          canAfford: true
        };
      });
    }

  }

  return Object.freeze({
    availableFor,
  });

})();