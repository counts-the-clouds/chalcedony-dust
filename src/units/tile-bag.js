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

  function getSequentialTiles() { return [...$sequentialTiles]; }
  function getSequentialTileCount() { return $sequentialTiles.length; }

  // Because events will be attached to the sequential tile, this array and the
  // weighted tiles are composed of actual tiles. The bagged tiles are only
  // tile codes and will need to be turned into real tiles when drawn.
  function addSequentialTiles(tiles) {
    tiles.forEach(tile => {
      if (tile.toString().indexOf('Tile') < 0) {
        throw `This ain't no Tile.`
      }
    });

    $sequentialTiles = $sequentialTiles.concat(tiles);
  }

  // The shift() function modifies the sequentialTiles array, removing the
  // first element. Not very functional of you javascript.
  function nextSequentialTile() {
    return $sequentialTiles.shift();
  }

  // Add the given frequency map of tile codes to the tile bag.
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

    $weightedTiles[tile.getCode()] = { tile, chance, heat };
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
          let tile = $weightedTiles[code].tile;
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
  // It's a bit of a pain in the ass here. As part of the game state the tile
  // bag will need to be serialized and deserialized to JSON. We're not
  // sending the entire bag to the client, but it will be saved with the game.

  function pack() {

    const packedSequentialTiles = $sequentialTiles.map(tile => {
      return tile.pack();
    });

    const packedWeightedTiles = {};
    Object.keys($weightedTiles).forEach(code => {
      const source = $weightedTiles[code];
      packedWeightedTiles[code] = {
        tile: source.tile.pack(),
        chance: source.chance,
        heat: source.heat,
      }
    })

    return {
      baggedTiles: $baggedTiles,
      sequentialTiles: packedSequentialTiles,
      weightedTiles: packedWeightedTiles,
    }
  }

  function unpack(data) {
    $baggedTiles = data.baggedTiles;

    $sequentialTiles = data.sequentialTiles.map(tileData => {
      return Tile(tileData);
    });

    $weightedTiles = {};
    Object.keys(data.weightedTiles).forEach(code => {
      const source = data.weightedTiles[code];
      $weightedTiles[code] = {
        tile: Tile(source.tile),
        chance: source.chance,
        heat: source.heat,
      }
    });
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