global.BuriedTreasure = (function() {

  let $heat;
  let $treasures;

  function reset() {
    $heat = 0;
    $treasures = {};
  }

  // TODO: Eventually the different discoveries that can be included in the
  //       buried treasure lists will be real data objects with immutable
  //       values. We may add more discoveries over the course of the game.
  //       When that happens we'll want to merge them with the existing
  //       treasure list. For now though this is only set when we start a new
  //       game, so we can just set the map directly. Pretty sure all of this
  //       will change though.
  //
  function addTreasures(code) {
    $treasures = ExtraRegistry.lookup(code);
  }

  function getTreasure(code) {
    return { ...$treasures[code] };
  }

  function rollForTreasure(tile) {
    return lookForTreasure(tile,Random.roll(100));
  }

  // We pass in roll into this function so that it can easily be tested.
  function lookForTreasure(tile,roll) {
    raiseHeat();

    if (roll < $heat) {
      $heat = 0;

      const discoverableTreasure = getDiscoverableTreasures(tile);
      console.log("Discoverable:",discoverableTreasure);
    }
  }

  function getDiscoverableTreasures(tile) {
    const distance = distanceToOrigin(tile.getCoordinates())

    return Object.keys($treasures).filter((key) => {
      const treasureData = $treasures[key];

      if (treasureData.distance) {
        let min = treasureData.distance[0];
        let max = treasureData.distance[1];
        if (min != null && distance < min) { return false; }
        if (max != null && distance > max) { return false; }
      }

      return true;
    });
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
    getTreasure,
    rollForTreasure,
    lookForTreasure,
    getHeat,
    pack,
    unpack,
  });

})();
