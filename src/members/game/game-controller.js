global.GameController = (function() {

  // The beginGame() first gets the current chapter from the world state. This
  // chapter information will probably have other flags and things set,
  // representing features that the player has unlocked. For now a chapter only
  // includes the name of the game stage to load. The stageData is used to set
  // the state of all the stateful game components.
  async function beginGame() {
    await GameState.clear();

    // TEMP: While were testing the baseline tiles...
    // setStage(GameStageRegistry.lookup(WorldState.getChapter()));
    setStage(GameStageRegistry.lookup('baseline'));

    await GameState.saveState();
  }

  function setStage(stageData) {
    GameState.reset();

    if (stageData.note) { Note.show(stageData.note); }

    // Flags should be an array of 2 element arrays: [['tile-bag.show',false]]
    (stageData.flags||[]).forEach(flag => {
      GameState.setFlag(flag[0],flag[1]);
    });

    // TODO: The baseline bagged tiles is a code for a frequency map of bagged
    //       tiles. We might want to make this accept an array of codes as well
    //       to handle more complex games. We might also want to loop through
    //       the game flags to see what tiles have been enabled.
    if (stageData.baggedTiles) {
      TileBag.addBaggedTiles(TileBagRegistry.lookup(stageData.baggedTiles));
    }

    // Shelved tiles just need the code and optional options for the normal
    // Tile constructor: [{ code,options }]
    (stageData.shelvedTiles||[]).forEach(tileData => {
      TileShelf.addTile(Tile(tileData.code, tileData.options));
    });

    // Placed tiles need the code, options, as well as the global (x,y)
    // coordinates for where the tiles should be placed: [{ x,y,code,options }]
    (stageData.placedTiles||[]).forEach(tileData => {
      DungeonGrid.setCell(
        Coordinates.fromGlobal(tileData.x,tileData.y),
        Tile(tileData.code, tileData.options));
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

    if (tile.getDrawNote()) {
      Note.show(tile.getDrawNote());
    }

    TileBag.raiseHeat();
    TileShelf.addTile(tile);
    await TileShelfView.addTile(tile);
    TileShelfView.positionTiles();

    localLog("Drew Tile",{ code:tile.getCode(), id:tile.getID() });
  }

  function placeTile(coordinates,tile) {
    const placementData = {
      x: coordinates.gx,
      y: coordinates.gy,
      code: tile.getCode(),
      id: tile.getID() };

    try {
      localLog("Place Tile",placementData);

      Note.clear();
      InnerCellHighlight.hide();

      DungeonGrid.setCell(coordinates, tile);
      DungeonView.placeTile(tile);

      // If a tile is placed programmatically (like the core tile) it will not
      // be on the shelf.
      if (TileShelf.hasTile(tile.getID())) {
        TileShelf.removeTile(tile.getID());
        TileShelfView.removeTile(tile);
      }

      if (tile.getPlacementEvent()) {
        EventView.show(PagedEvent(tile.getPlacementEvent()))
      }
      if (tile.getPlacementTrigger()) {
        TriggerRegistry.lookup(tile.getPlacementTrigger()).triggerFunction(tile);
      }

      // TODO: Eventually we'll want to draw tiles on a timer. Tiles in sequence should speed up that draw timer so
      //       that they're drawn immediately. For now though we can just draw tiles when they're placed.
      // if (TileBag.isSequence()) { GameController.drawTile(); }
      GameController.drawTile();

    }
    catch (error) {
      logError(`Error Placing Tile`, error, {
        system:'GameController',
        data:placementData
      });
    }
  }

  function localLog(message,data) {
    log(message,{ system:'GameController', data:data });
  }

  return Object.freeze({
    beginGame,
    setStage,
    drawTile,
    placeTile,
  });

})();
