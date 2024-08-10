global.TileBag = (function() {

  let $baggedTiles;
  let $sequentialTiles;
  let $weightedTiles;

  function reset() {
    $baggedTiles = {};
    $sequentialTiles = [];
    $weightedTiles = {};
  }

  function isEmpty() { return size() === 0; }
  function isSequence() { return $sequentialTiles.length > 0; }

  function size() {
    return ($sequentialTiles.length +
           Object.keys($baggedTiles).length +
           Object.keys($weightedTiles).length);
  }

  function getSequentialTileCount() { return $sequentialTiles.length; }

  // The sequentialTiles array should be an array of actual tiles.
  function addSequentialTiles(tiles) {
    $sequentialTiles = $sequentialTiles.concat(tiles.map(tile => tile.getID()));
  }

  // The shift() function modifies the sequentialTiles array, removing the
  // first element. Not very functional of you javascript.
  function nextSequentialTile() {
    return TileDataStore.get($sequentialTiles.shift());
  }

  // Add the given frequency map of tile codes to the tile bag. We fetch the
  // tile from the registry here just to make sure it's an actual tile.
  function addBaggedTiles(tileMap) {
    Object.keys(tileMap).forEach(code => {
      TileRegistry.lookup(code);
      $baggedTiles[code] = ($baggedTiles[code]||0) + tileMap[code];
    });
  }

  // Remove a single tile from the bag. This will decrease the tile's entry in
  // the baggedTiles frequency map by 1.
  function removeBaggedTile(code) {
    if ($baggedTiles[code] < 1) {
      throw `Trying to remove Tile:${code}, but there are none in the bag.`
    }

    $baggedTiles[code] -= 1;

    if ($baggedTiles[code] === 0) {
      deleteBaggedTile(code);
    }
  }

  // Remove all tiles with the given code from the bag.
  function deleteBaggedTile(code) {
    delete $baggedTiles[code];
  }

  // Add a weighted tile to the tile bag.
  //   tile:    The tile object
  //   chance:  The chance that this tile will be drawn next draw.
  //   heat:    How much more likely is it that this tile will be drawn next
  //            time. The heat value can be 0 or even negative if drawing a
  //            tile should become less likely. This could be used to simulate
  //            a temp 'luck' or 'curse' effect.
  function addWeightedTile(tile, chance, heat) {
    Validate.between('chance', chance, 0, 100);

    if ($weightedTiles[tile.getCode()] != null) {
      throw `This weighted tile is already present. They should be unique in bag.`
    }

    $weightedTiles[tile.getCode()] = { tileID:tile.getID(), chance, heat };
  }

  function deleteWeightedTile(code) {
    delete $weightedTiles[code];
  }

  // When drawing a tile we first see if there's a sequential tile that should
  // be chosen next, and return it if there is. We then loop through the
  // weighted tiles, rolling  against each of their chance value to see if it's
  // drawn. If not we draw a tile at random from the bagged tiles. Every time a
  // tile is drawn we remove that tile from the bag.
  //
  // After calling drawTile() it's important to remember to also call
  // raiseHeat()
  function drawTile() {
    const weightedCodes = Object.keys($weightedTiles);

    if (getSequentialTileCount() > 0) {
      return nextSequentialTile();
    }

    if (weightedCodes.length > 0) {
      for (const code of weightedCodes) {
        if (Random.upTo(100) < $weightedTiles[code].chance) {
          let tile = TileDataStore.get($weightedTiles[code].tileID);
          deleteWeightedTile(code);
          return tile;
        }
      }
    }

    const code = Random.fromFrequencyMap($baggedTiles);
    removeBaggedTile(code);

    return Tile({ code });
  }

  // Each time we draw a tile without drawing a weighted tile we make it more
  // likely (or less likely in some cases) that the weighted tile will be drawn.
  function raiseHeat() {
    Object.keys($weightedTiles).forEach(code => {
      $weightedTiles[code].chance += $weightedTiles[code].heat;
      if ($weightedTiles[code].chance > 100) { $weightedTiles[code].chance = 100 }
      if ($weightedTiles[code].chance <= 0) { deleteWeightedTile(code); }
    });
  }

  // === Serialization =========================================================

  function pack() {
    return {
      baggedTiles: $baggedTiles,
      sequentialTiles: $sequentialTiles,
      weightedTiles: $weightedTiles,
    }
  }

  function unpack(data) {
    $baggedTiles = data.baggedTiles;
    $sequentialTiles = data.sequentialTiles;
    $weightedTiles = data.weightedTiles;
  }

  return Object.freeze({
    reset,
    isEmpty,
    isSequence,
    size,
    addSequentialTiles,
    addBaggedTiles,
    removeBaggedTile,
    deleteBaggedTile,
    addWeightedTile,
    deleteWeightedTile,
    drawTile,
    raiseHeat,
    pack,
    unpack,
  });

})();