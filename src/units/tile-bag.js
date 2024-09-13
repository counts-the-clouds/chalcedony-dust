global.TileBag = (function() {

  const BASE_TILES = {
    // Halls
    'baseline-h1-0': 6,
    'baseline-h2-0': 12,
    'baseline-h2-1': 6,
    'baseline-h2-2': 6,
    'baseline-h3-0': 4,
    'baseline-h3-1': 4,
    'baseline-h3-2': 4,
    'baseline-h4-0': 2,
    'baseline-h4-1': 2,
    'baseline-h4-2': 2,

    // Rooms
    'baseline-r1-0': 2,
    'baseline-r1-1': 2,
    'baseline-r1-2': 2,
    'baseline-r2-0': 6,
    'baseline-r2-1': 6,
    'baseline-r2-2': 6,
    'baseline-r2-3': 6,
    'baseline-r3-0': 4,
    'baseline-r3-1': 4,
    'baseline-r4-0': 2,
    'baseline-r4-1': 2,

    // 1 Hall + Rooms
    'baseline-h1-r1-0': 8,
    'baseline-h1-r1-1': 8,
    'baseline-h1-r1-2': 8,
    'baseline-h1-r2-0': 6,
    'baseline-h1-r2-1': 6,
    'baseline-h1-r2-2': 6,
    'baseline-h1-r3-0': 4,

    // Halls + 1 Room
    'baseline-h2-r1-0': 6,
    'baseline-h2-r1-1': 6,
    'baseline-h2-r1-2': 6,
    'baseline-h2-r2-0': 4,
    'baseline-h2-r2-1': 4,
    'baseline-h3-r1-0': 4,
  };

  const GUARDIAN_TILES = {
    // Halls + Node
    'baseline-h1-n1-0': 1,
    'baseline-h2-n1-0': 1,
    'baseline-h2-n1-1': 1,
    'baseline-h3-n1-0': 1,
    'baseline-h3-n1-1': 1,
    'baseline-h4-n1-0': 1,
    'baseline-h4-n1-1': 1,

    // Rooms + Node
    'baseline-r1-n1-0': 1,
    'baseline-r2-n1-0': 1,
    'baseline-r3-n1-0': 1,
    'baseline-r4-n1-0': 1,

    // Hall + Room + Node
    'baseline-h1-r1-n1-0': 1,
    'baseline-h1-r3-n1-0': 1,
  }

  // Probably going to tweak this map over time. I'm thinking now that a
  // minimum number of tiles need to be placed before a guardian tile can be
  // drawn. Because you can have multiple guardians in a game, each time a
  // guardian tile is drawn the number of tiles needed to draw another guardian
  // increases dramatically. This is in addition to the GuardianSummonLimit set
  // on the world state which further limits the guardians count to 2, 4, or 6
  const THE_MINIMUM_NUMBER_OF_TILES_THAT_MUST_BE_PLACED_BEFORE_THE_NEXT_GUARDIAN_CAN_BE_DRAWN = {
    0: 20,
    1: 80,
    2: 200,
    3: 400,
    4: 700,
    5: 1000,
  };

  let $sequenceCode;
  let $sequenceIndex;
  let $guardianHeat;
  let $guardiansDrawn;

  function reset() {
    $sequenceCode = null;
    $sequenceIndex = null;
    $guardianHeat = 0;
    $guardiansDrawn = 0;
  }

  function drawTile() {
    if (isSequence()) { return nextSequentialTile(); }
    if (shouldDrawGuardian()) { return drawGuardianTile(); }
    return Tile({ code:Random.fromFrequencyMap(BASE_TILES) });
  }

  // === Tile Sequences ========================================================

  function isSequence() { return $sequenceCode != null }

  function startTileSequence(sequenceCode) {
    $sequenceCode = sequenceCode;
    $sequenceIndex = 0;
  }

  function nextSequentialTile() {
    const tiles = ExtraRegistry.lookup($sequenceCode).sequence;
    const tile = Tile(tiles[$sequenceIndex]);

    if (++$sequenceIndex >= tiles.length) {
      $sequenceCode = null;
      $sequenceIndex = null;
    }

    return tile
  }

  // === Guardian Tiles ========================================================

  function shouldDrawGuardian() {
    if ($guardiansDrawn >= WorldState.getGuardianSummonLimit()) { return false; }
    if (TileDataStore.size() < THE_MINIMUM_NUMBER_OF_TILES_THAT_MUST_BE_PLACED_BEFORE_THE_NEXT_GUARDIAN_CAN_BE_DRAWN[$guardiansDrawn]) { return false; }

    $guardianHeat += Random.upTo(5);

    console.log(`He comes... ${$guardianHeat}`);

    return $guardianHeat >= Random.upTo(100);
  }

  function drawGuardianTile() {
    $guardiansDrawn += 1;
    $guardianHeat = 0;
    return Tile({ code:Random.fromFrequencyMap(GUARDIAN_TILES) });
  }

  function guardianTileDiscarded() {
    $guardiansDrawn -= 1;
  }

  // === Serialization =========================================================

  function pack() {
    return {
      sequenceCode: $sequenceCode,
      sequenceIndex: $sequenceIndex,
      guardianHeat: $guardianHeat,
    }
  }

  function unpack(data) {
    $sequenceCode = data.sequenceCode;
    $sequenceIndex = data.sequenceIndex;
    $guardianHeat = data.guardianHeat;
  }

  return Object.freeze({
    reset,
    drawTile,
    isSequence,
    startTileSequence,
    guardianTileDiscarded,
    pack,
    unpack,
  });

})();