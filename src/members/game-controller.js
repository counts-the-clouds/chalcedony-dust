global.GameController = (function() {

  let $stageData;

  // The beginGame() first gets the current chapter from the world state. This
  // chapter information will probably have other flags and things set,
  // representing features that the player has unlocked. For now a chapter only
  // includes the name of the game stage to load. The stageData is used to set
  // the state of all the stateful game components.
  async function prepareGame() {
    await GameState.clear();
    GameState.reset();
    DungeonGrid.build();

    $stageData = GameStageRegistry.lookup(WorldState.getChapter())

    // The flags are a normal map of flag keys and values.
    Object.keys($stageData.flags||{}).forEach(flag => {
      GameFlags.set(flag,$stageData.flags[flag]);
    });

    // TODO: The baseline bagged tiles is a code for a frequency map of bagged
    //       tiles. We might want to make this accept an array of codes as well
    //       to handle more complex games. We might also want to loop through
    //       the game flags to see what tiles have been enabled.
    if ($stageData.baggedTiles) {
      TileBag.addBaggedTiles(TileBagRegistry.lookup($stageData.baggedTiles));
    }

    if ($stageData.sequentialTiles) {
      TileBag.addSequentialTiles($stageData.sequentialTiles.map(tileData => {
        return Tile(tileData);
      }));
    }

    // Shelved tiles just need the code and optional options for the normal
    // Tile constructor: [{ code,options }]
    ($stageData.shelvedTiles||[]).forEach(tileData => {
      TileShelf.addTile(Tile(tileData));
    });

    // Placed tiles need the code, options, as well as the global (x,y)
    // coordinates for where the tiles should be placed: [{ x,y,code,options }]
    ($stageData.placedTiles||[]).forEach(tileData => {
      DungeonGrid.setTile(
        Coordinates.fromGlobal(tileData.x,tileData.y),
        Tile(tileData));
    });

    await GameState.saveState();
  }

  // The openGame() function is called once the DungeonView has finished
  // loading. The game load needed to be split into prepare and open functions
  // because the TileBag, TileShelf, and DungeonGrid should all be initialized
  // before the DungeonView is opened, but tasks like showing an event requires
  // the DungeonView to be open already.
  async function openGame() {
    if ($stageData.startingEvent) {
      EventView.show(PagedEvent($stageData.startingEvent));
    }
  }

  // ===========================================================================

  async function drawTile() {

    // TODO: If we try and draw a tile, and there are no tiles in the bag
    //       this should trigger a game over event, for now we can just throw
    //       an exception reminding us to do this.
    if (TileBag.size() === 0) {
      throw `There are no more tiles left in the bag. Game over.`
    }

    // TODO: If the shelf is full and we're forced to discard a tile the tile
    //       just disappears off of the shelf or out of your hand (if dragging)
    //       This should be more dramatic, something like an animation of the
    //       tile crumbling away or going up in flames.
    if (TileShelf.getEmptySpaceCount() === 0) {
      if (DragonDrop.isDragging()) { DragonDrop.stopDrag('cancel'); }
      const lastTile = TileShelf.discardLastTile();
      TileShelfView.removeTile(lastTile);
    }

    const tile = TileBag.drawTile();

    if (tile.getDrawNote()) {
      Note.show(tile.getDrawNote());
    }

    TileBag.raiseHeat();
    TileShelf.addTile(tile);
    await TileShelfView.addTile(tile);
    TileShelfView.positionTiles();

    log("Drew Tile",{ system:'GameController', code:tile.getCode(), id:tile.getID(), level:3 });
  }

  function placeTile(coordinates,tile) {
    const placementData = {
      x: coordinates.gx,
      y: coordinates.gy,
      code: tile.getCode(),
      id: tile.getID() };

    try {
      log("Place Tile",{ system:'GameController', data:placementData , level:2 });

      Note.clear();
      InnerCellHighlight.hide();

      DungeonGrid.setTile(coordinates, tile);
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

      // TODO: We have the timer now, but we need to readdress how drawing
      //       tiles in a tile sequence is handled. The generate tile timer is
      //       always running, but it will need to take the tile bag state into
      //       consideration
      // if (TileBag.isSequence()) { GameController.drawTile(); }
    }
    catch (error) {
      logError(`Error Placing Tile`, error, {
        system:'GameController',
        data:placementData
      });
    }
  }

  return Object.freeze({
    prepareGame,
    openGame,
    drawTile,
    placeTile,
  });

})();
