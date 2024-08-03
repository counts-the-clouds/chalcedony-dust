global.TileBag = (function() {

  let $baggedTiles;
  let $sequenceData;
  let $weightedTiles;

  function reset() {
    $baggedTiles = {};
    $sequenceData = null;
    $weightedTiles = {};
  }

  function isEmpty() { return size() === 0; }
  function isSequence() { return $sequenceData !== null; }

  function size() {
    return (getSequentialTileCount() +
           Object.keys($baggedTiles).length +
           Object.keys($weightedTiles).length);
  }

  // TODO: When a sequence is started we need to show an image representing
  //       that sequence on the tile bag ui component. It makes sense that this
  //       value should come from the tile bag object. Right now we're just
  //       setting the raw data from whatever starts the sequence. We might
  //       eventually want a data object for this, but at the moment I have no
  //       idea how frequent tile sequences are going to be.
  //
  //       Calling startSequence() should be what starts the animation that
  //       shows the tile bag state changing to sequence mode. Because the only
  //       example of this is the tutorial game's "enable tile bag" animation,
  //       which should only be seen once, we don't have a need to implement an
  //       actual version of this yet.
  //
  //       { background:'/tile-bag/forest-path-sequence.png' }

  function startSequence(sequenceData) {
    $sequenceData = { ...sequenceData };
    $sequenceData.tiles = [];
  }

  // TODO: When a sequence ends we need to inform the client so it can change
  //       the look of the tile bag.
  function endSequence() {
    $sequenceData = null;
  }

  function getSequenceData() { return $sequenceData }
  function getSequentialTiles() { return $sequenceData == null ? null : $sequenceData.tiles; }
  function getSequentialTileCount() { return getSequentialTiles() == null ? 0 : getSequentialTiles().length; }

  // Because events will be attached to the sequential tile, this array and the
  // weighted tiles are composed of actual tiles. The bagged tiles are only
  // tile codes and will need to be turned into real tiles when drawn.
  function addSequentialTiles(tiles) {
    if ($sequenceData == null) {
      throw 'A sequence has not been started. Call startSequence() first.'
    }
    $sequenceData.tiles = $sequenceData.tiles.concat(tiles);
  }

  // The shift() function modifies the sequentialTiles array, removing the
  // first element. Not very functional of you javascript.
  function nextSequentialTile() {
    let tile = $sequenceData.tiles.shift();
    if (getSequentialTileCount() === 0) { endSequence(); }
    return tile;
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

    let packedSequenceData = null;
    if ($sequenceData != null) {
      packedSequenceData = { ...$sequenceData };
      packedSequenceData.tiles = $sequenceData.tiles.map(tile => {
        return tile.pack()
      });
    }

    let packedWeightedTiles = {};
    Object.keys($weightedTiles).forEach(code => {
      let source = $weightedTiles[code];
      packedWeightedTiles[code] = {
        tile: source.tile.pack(),
        chance: source.chance,
        heat: source.heat,
      }
    })

    return {
      baggedTiles: $baggedTiles,
      sequenceData: packedSequenceData,
      weightedTiles: packedWeightedTiles,
    }
  }

  function unpack(data) {

    $baggedTiles = data.baggedTiles;

    $sequenceData = data.sequenceData;
    if ($sequenceData != null) {
      $sequenceData.tiles = data.sequenceData.tiles.map(tileData => {
        return Tile(tileData);
      });
    }

    $weightedTiles = {};
    Object.keys(data.weightedTiles).forEach(code => {
      let source = data.weightedTiles[code];
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
    startSequence,
    getSequenceData,
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