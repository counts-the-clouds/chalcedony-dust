global.BuriedTreasure = (function() {

  let $heat;
  let $treasures;

  function reset() {
    $heat = 0;
    $treasures = [];
  }

  // TODO: Eventually the different discoveries that can be included in the
  //       buried treasure lists will be real data objects with immutable
  //       values. We may add more discoveries over the course of the game.
  //       When that happens we'll want to merge them with the existing
  //       treasure list. For now though this is only set when we start a new
  //       game, so we can just set the map directly. Pretty sure all of this
  //       will change though.
  //
  // Add treasures either from a standard package or as map of discoveries.
  // Expected format is 'currently'
  //       'coal-mine':{ type:_resource, count:2, distance:[0,null], weight:100 },
  function addTreasures(argument) {
    $treasures = (typeof argument === 'string') ? ExtraRegistry.lookup(argument).treasures : argument;
  }

  function removeTreasure(code) {
    const index = indexOfTreasure(code);

    if (index == null) { throw `No such treasure ${code}`; }

    $treasures[index].count -= 1;
    if ($treasures[index].count < 1) {
      $treasures.splice(index,1);
    }
  }

  function getTreasure(code) {
    for (const treasure of $treasures) {
      if (treasure.code === code) { return { ...treasure }; }
    }
  }

  function setCount(code,count) {
    const index = indexOfTreasure(code);
    if (index == null) { throw `No such treasure ${code}`; }
    $treasures[index].count = count;
  }

  function indexOfTreasure(code) {
    for (let i=0; i<$treasures.length; i++) {
      if ($treasures[i].code === code) { return i; }
    }
  }

  // === Rolling For Treasure ==================================================

  function rollForTreasure(tile) {
    if (GameFlags.has(_forceDiscovery)) {
      const forcedDiscovery = getForcedDiscovery(tile);

      // If we're forcing the discovery to happen we still need to make sure
      // that the discovery is valid for the tile being placed. If the forced
      // discovery can't happen we want to roll as normal otherwise a forced
      // discovery that isn't possible could block any other discoveries from
      // happening.
      if (forcedDiscovery) { return forcedDiscovery; }
    }

    return lookForTreasure(tile,Random.roll(100));
  }

  function lookForTreasure(tile,roll) {
    raiseHeat();
    if (roll < $heat) {
      $heat = 0;

      const discoverableTreasures = getDiscoverableTreasures(tile);
      const totalWeight = sumAllWeights(discoverableTreasures);

      return selectDiscovery(discoverableTreasures, totalWeight, Random.roll(totalWeight))
    }
  }

  function selectDiscovery(discoverableTreasures, totalWeight, roll) {
    let index = 0;
    let accumulator = 0;

    while (accumulator < totalWeight) {
      const discovery = discoverableTreasures[index++];
      accumulator += discovery.weight;

      if (roll < accumulator) {
        removeTreasure(discovery.code);
        return discovery;
      }
    }
  }

  // We're just considering the min and max distances from the origin for now.
  // We'll probably add some other conditions in the future though.
  function getDiscoverableTreasures(tile) {
    const distance = distanceToOrigin(tile.getCoordinates())

    return $treasures.filter(treasureData => {
      if (treasureData.distance) {
        let min = treasureData.distance[0];
        let max = treasureData.distance[1];
        if (min != null && distance < min) { return false; }
        if (max != null && distance > max) { return false; }
      }

      return true;
    });
  }

  function sumAllWeights(discoveries) {
    return discoveries.reduce((sum, discovery) => sum + discovery.weight, 0);
  }

  function distanceToOrigin(coordinates) {
    if (coordinates == null) { throw `The tile must have coordinates` }
    const x = coordinates.gx * coordinates.gx;
    const y = coordinates.gy * coordinates.gy;
    return Math.floor(Math.sqrt(x+y));
  }

  // TODO: Making this its own function for now because there may be factors
  //       that adjust how much we raise the heat by. There could be some kind
  //       of treasure hunting buff that increases the rate. I think raising
  //       the heat by 3% each tile sounds like a reasonable rate to start with.
  function raiseHeat() { $heat += 3; }
  function getHeat() { return $heat; }

  // === Forced Discovery ======================================================

  function forceDiscovery(code) { GameFlags.set(_forceDiscovery,code); }

  function getForcedDiscovery(tile) {
    const forcedCode = GameFlags.get(_forceDiscovery);
    const discoverable = getDiscoverableTreasures(tile);

    // If forced code is a string, we can assume it's the code of the discovery
    // we want to make. If that discovery is valid (and thus in the discoverable
    // array) we can remove and return it.
    if (typeof forcedCode === 'string') {
      const index = ArrayHelper.find(discoverable, d => d.code === forcedCode);
      if (index >= 0) {
        const discovery = discoverable[index];
        removeTreasure(discovery.code);
        return discovery;
      }
      return undefined;
    }

    // Otherwise, when the forcedCode is set to true, we want to randomly
    // return anything that's currently discoverable. (SelectDiscovery handles
    // the removal for us here)
    if (forcedCode === true) {
      const totalWeight = sumAllWeights(discoverable);
      return selectDiscovery(discoverable, totalWeight, Random.roll(totalWeight))
    }

    throw `Improper forced discovery value: ${forcedCode}`;
  }

  // === Serialization =========================================================

  function pack() {
    return {
      heat: $heat,
      treasures: $treasures,
    }
  }

  function unpack(data) {
    $heat = data.heat;
    $treasures = data.treasures;
  }

  return Object.freeze({
    reset,
    addTreasures,
    removeTreasure,
    getTreasure,
    setCount,
    indexOfTreasure,
    rollForTreasure,
    getDiscoverableTreasures,
    sumAllWeights,
    lookForTreasure,
    getHeat,
    forceDiscovery,
    pack,
    unpack,
  });

})();
