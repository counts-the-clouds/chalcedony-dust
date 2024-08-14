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
  //       'coal-mine':{ type:_discoverResource, count:2, distance:[0,null], weight:100 },
  function addTreasures(argument) {
    $treasures = (typeof argument === 'string') ? structuredClone(ExtraRegistry.lookup(argument).treasures) : argument;
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

  // Called by the GameController when a tile is placed. This will make the
  // adjustments to the tile being placed if a discovery was made.
  function attemptDiscovery(tile) {
    if (tile.getCoordinates() == null) { throw `The tile must have coordinates` }

    const discovery = rollForTreasure(tile);
    if (discovery) {
      log(`A Discovery was made`, { system:'BuriedTreasure', level:1, data:{ discovery }});
      DiscoveryAdjuster.adjustTile(tile,discovery);
    }
  }

  function rollForTreasure(tile) {
    if (GameFlags.has(_forbidDiscovery)) { return undefined; }
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
    raiseHeat(tile);
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

  // Certain discoveries make adjustments to the placed tile. A resource node
  // will display that node on the tile. If this tile is already a node type it
  // can't hold another resource node. We also consider the the min and max
  // distances from the origin.
  function getDiscoverableTreasures(tile) {
    const distance = distanceToOrigin(tile.getCoordinates())
    const isNode = tile.getSegments().map(segment => segment.getType()).includes(_node);

    return $treasures.filter(treasureData => {
      if (isNode && treasureData.type === _discoverResource) { return false; }

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
    const x = coordinates.gx * coordinates.gx;
    const y = coordinates.gy * coordinates.gy;
    return Math.floor(Math.sqrt(x+y));
  }

  // TODO: There may be other factors that adjust how much we raise the heat
  //       by. There could be some kind of treasure hunting buff that increases
  //       the rate. I think a default value if 3% each tile sounds like a
  //       reasonable rate to start with.
  //
  // When raising the heat we need to consider the tile being placed and the
  // tile's distance from the origin. We don't want to make discoveries early
  // on, so we require a distance of at least 5 before raising the heat. It's
  // possible to place distant tiles to raise the heat, then place a close tile
  // and make a discovery. That's fine, heat is more of a time gate. The
  // individual discoveries have their own distance requirements. We should
  // also only raise the heat if there are things that can be discovered when a
  // tile is placed.
  function raiseHeat(tile) {
    const distance = distanceToOrigin(tile.getCoordinates())
    const discoverable = getDiscoverableTreasures(tile);

    console.log(`Distance:${distance}  Discoverables:${discoverable.length}`);
    if (distance >= 5 && discoverable.length > 0) {
      console.log(`   Raising Heat: ${$heat}`)
      $heat += 3;
    }
  }

  function setHeat(heat) { $heat = heat; }
  function getHeat() { return $heat; }

  // === Forced Discovery ======================================================

  // Force and forbid are mutually exclusive, setting one should clear the
  // other. GameFlags won't enforce this, so these functions should usually be
  // used to set these flags..
  function forbidDiscovery() {
    GameFlags.set(_forbidDiscovery, true);
    if (GameFlags.has(_forceDiscovery)) {
      GameFlags.clear(_forceDiscovery);
    }
  }

  function forceDiscovery(code) {
    GameFlags.set(_forceDiscovery, code);
    if (GameFlags.has(_forbidDiscovery)) {
      GameFlags.clear(_forbidDiscovery);
    }
  }

  function getForcedDiscovery(tile) {
    const forcedCode = GameFlags.get(_forceDiscovery);
    const discoverable = getDiscoverableTreasures(tile);

    if (discoverable.length === 0) {
      return undefined
    }

    // If forced code is a string, we can assume it's the code of the discovery
    // we want to make. If that discovery is valid (and thus in the discoverable
    // array) we can remove and return it.
    if (typeof forcedCode === 'string') {
      const index = ArrayHelper.find(discoverable, d => d.code === forcedCode);
      if (index >= 0) {
        GameFlags.clear(_forceDiscovery);
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
      GameFlags.clear(_forceDiscovery);
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
    attemptDiscovery,
    rollForTreasure,
    getDiscoverableTreasures,
    sumAllWeights,
    lookForTreasure,
    setHeat,
    getHeat,
    forbidDiscovery,
    forceDiscovery,
    pack,
    unpack,
  });

})();
