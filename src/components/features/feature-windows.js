global.FeatureWindows = (function() {

  async function open(feature) {

    if (feature.getState() === FeatureState.incomplete) {
      throw `Cannot open a feature window for an incomplete feature.`
    }

    if (feature.getState() === FeatureState.complete) {
      const casement = await openEmptyFeatureWindow(feature);
      if (casement) {
        addAvailableUpgrades(feature,casement);
      }
      return;
    }

    throw `Unexpected state for feature window: ${feature} ${feature.getState()}`;
  }

  async function openEmptyFeatureWindow(feature) {
    if (Casement.getAssociatedCasements(feature.toString()).length === 0) {
      const casement = await Casement.fromPath('views/empty-feature-window.html');
      casement.setAssociatedWith(feature.toString());
      casement.setTitle(feature.getDisplayName());
      casement.setBounds({ top:20, left:20, height:200, width:400 });
      return casement;
    }
  }

  function addAvailableUpgrades(feature,casement) {
    FeatureUpgrades.availableFor(feature).forEach(upgradeStatus => {
      const upgrade = FeatureUpgradeRegistry.lookup(upgradeStatus.code);
      const upgradeItem = buildUpgradeItem(upgrade);

      upgradeItem.querySelector('a.button').addEventListener('click', () => {
        console.log("Execute Upgrade:",feature.toString(),upgradeStatus.code);
      });

      casement.getCasementContent().querySelector('#upgradeList').appendChild(upgradeItem);
    });
  }

  function buildUpgradeItem(upgrade) {
    return X.createElement(`
      <li class='upgrade'>
        <div class='name'>${upgrade.displayName}</div>
        <div class='description'>${upgrade.description}</div>
        <div class='costs'>${buildCostElements(upgrade)}</div>
        <div class='actions'>
          <a href='#' class='button button-small'>Upgrade</a>
        </div>
      </li>`);
  }

  // This is built as a string because we're feeding it directly into the
  // createElement() function.
  function buildCostElements(upgrade) {
    let buffer = '';

    Object.keys(upgrade.cost).forEach(costCode => {
      let name;
      let quantity = upgrade.cost[costCode];

      if (costCode === 'mana') { name = 'Mana'; }
      if (name == null) { name = ItemRegistry.lookup(costCode).name; }

      buffer += `
        <div class='cost-item'>
          <div class='name'>${name}</div>
          <div class='count'>${quantity}</div>
        </div>`;
    });

    return buffer;
  }

  return Object.freeze({
    open,
  });

})();