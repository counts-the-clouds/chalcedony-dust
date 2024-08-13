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

  function removeTreasure(index) {
    if ($treasures[index] == null) { throw `No treasure at index ${index}`; }

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

  function indexOfTreasure(code) {
    for (let i=0; i<$treasures.length; i++) {
      if ($treasures[i].code === code) { return i; }
    }
  }

  function rollForTreasure(tile) {
    return lookForTreasure(tile,Random.roll(100));
  }


  // We pass in roll into this function so that it can more easily be tested.
  // There's still some randomness in this function because when we decide that
  // a discovery has been made we still randomly pick a discovery based on its
  // weight and validity.
  function lookForTreasure(tile,roll) {
    raiseHeat();

    if (roll < $heat) {
      $heat = 0;

      const discoverableTreasure = getDiscoverableTreasures(tile);
      const totalWeight = sumAllWeights(discoverableTreasure);
      const weightRoll = Random.roll(totalWeight);

      let index = 0;
      let accumulator = 0;

      while (accumulator < totalWeight) {
        const discovery = $treasures[index++];
        accumulator += discovery.weight;

        if (weightRoll < accumulator) {
          removeTreasure(index - 1);
          return discovery;
        }
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
    indexOfTreasure,
    rollForTreasure,
    getDiscoverableTreasures,
    sumAllWeights,
    lookForTreasure,
    getHeat,
    pack,
    unpack,
  });

})();
