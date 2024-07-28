global.GameController = (function() {

  // The beginGame() first gets the current chapter from the world state. This
  // chapter information will probably have other flags and things set,
  // representing features that the player has unlocked. For now a chapter only
  // includes the name of the game stage to load. The stageData is used to set
  // the state of all the stateful game components.
  async function beginGame() {
    await GameState.clear();
    setStage(GameStageRegistry.lookup(WorldState.getChapter()));
    await GameState.saveState();
  }

  function setStage(stageData) {
    GameState.reset();

    if (stageData.note) { Note.show(stageData.note); }

    // Flags should be an array of 2 element arrays: [['tile-bag.show',false]]
    (stageData.flags||[]).forEach(flag => {
      GameState.setFlag(flag[0],flag[1]);
    });

    // Shelved tiles just need the code and optional options for the normal
    // Tile constructor: [{ code,options }]
    (stageData.shelvedTiles||[]).forEach(tileData => {
      const tile = Tile(tileData.code, tileData.options)
            tile.buildSegments();

      TileShelf.addTile(tile);
    });

    // Placed tiles need the code, options, as well as the global (x,y)
    // coordinates for where the tiles should be placed: [{ x,y,code,options }]
    (stageData.placedTiles||[]).forEach(tileData => {
      const coords = Coordinates.fromGlobal(tileData.x,tileData.y);
      const tile = Tile(tileData.code, tileData.options);
            tile.buildSegments();

      DungeonGrid.setCell(coords, tile);
    });
  }

  // TODO: If we try and draw a tile, and there are no tiles in the bag
  //       this should trigger a game over event, for now we can just throw
  //       an exception reminding us to do this.
  async function drawTile() {

    if (TileBag.size() === 0) {
      throw `There are no more tiles left in the bag. Game over.`
    }

    const tile = TileBag.drawTile();
          tile.buildSegments();

    if (tile.getDrawNote()) {
      Note.show(tile.getDrawNote());
    }

    TileBag.raiseHeat();
    TileShelf.addTile(tile);
    await TileShelfView.addTile(tile);
    TileShelfView.positionTiles();

    localLog("Drew Tile",{ code:tile.getCode(), id:tile.getID() });
  }

  function localLog(message,data) {
    log(message,{ system:'GameController', data:data });
  }

  return Object.freeze({
    beginGame,
    setStage,
    drawTile,
  });

})();
