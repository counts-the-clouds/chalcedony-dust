global.Blueprint = function(code) {
  const $code = code;
  const $data = BlueprintRegistry.lookup(code);

  function getCode() { return $code; }
  function getDisplayName() { return $data.displayName; }

  function getDetails(options = {}) {
    const context = {};
    const extra = $data.extra || {}

    let text = $data.details;

    if (extra.lair) {
      const minion = Minion(extra.lair);
      context.size = options.feature.getSize();
      context.minionCount = minion.getMinionCountForSize(context.size);
      context.minionPluralName = minion.getPluralName();
      text += ` With {{@size}} tiles, this lair would hold {{@minionCount}} {{@minionPluralName}}.`
    }

    return Weaver(context).weave(text);
  }

  // TODO: Some features may have additional costs, something like a single
  //       item needed to unlock and create the room, or something like that.
  function getCost(feature) {
    const size = feature.getSize();
    const compiledCost = {};

    Object.keys($data.costPerTile || {}).forEach(code => {
      compiledCost[code] = $data.costPerTile[code] * size;
    });

    return compiledCost;
  }

  function canAfford() {
    const cost = getCost();
    for (const key of Object.keys(cost)) {
      if (key === 'mana' && GameState.getMana() < cost.mana) { return false; }
      if (key !== 'mana' && GameInventory.getItemCount(key) < cost[key]) { return false; }
    }
    return true;
  }

  function startConstruction(featureID) {
    ClockManager.addClock(Clock({
      code:'build-feature',
      duration:($data.constructionTime * 1000),
      context: { code:$code },
      parent:{ type:'Feature', id:featureID },
    }));
  }

  function onConstructionComplete(feature) {
    if (typeof $data.onConstructionComplete === 'function') {
      $data.onConstructionComplete(feature);
    }
  }

  return Object.freeze({
    getCode,
    getDisplayName,
    getDetails,
    getCost,
    canAfford,
    startConstruction,
    onConstructionComplete,
  });
}

// TODO: This function will also need to determine what upgrades have been
//       unlocked.
//
Blueprint.availableFor = function(feature) {
  const distance = feature.distanceToOrigin();
  const size = feature.getSize();
  const type = feature.getType();

  if (feature.getState() === FeatureState.incomplete) {
    throw 'Should not be calling this for an incomplete feature.'
  }

  if (feature.getState() === FeatureState.complete) {
    const available = BlueprintRegistry.filter((code, blueprint) => {
      if (blueprint.type !== type) { return false; }

      if (blueprint.requirements) {
        if (CentralScrutinizer.anyConditionFails(blueprint.requirements, { feature })) {
          return false;
        }
      }

      if (blueprint.upgradeFrom) { return false; }
      if (blueprint.minSize && size < blueprint.minSize) { return false; }
      if (blueprint.maxSize && size > blueprint.maxSize) { return false; }
      if (blueprint.minDistance && distance < blueprint.minDistance) { return false; }
      if (blueprint.maxDistance && distance > blueprint.maxDistance) { return false; }

      return true;
    });

    return Object.keys(available).map(code => {
      return Blueprint(code);
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
