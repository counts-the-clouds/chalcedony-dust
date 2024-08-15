global.GameController = (function() {

  // The startNewGame() first gets the current chapter from the world state.
  // This chapter information will probably have other flags and things set,
  // representing features that the player has unlocked. For now a chapter only
  // includes the name of the game stage to load. The stageData is used to set
  // the state of all the stateful game components.
  async function startNewGame() {
    await WorldState.startNewGame()

    await GameState.clear();
    GameState.reset();
    DungeonGrid.build();

    const stageData = ExtraRegistry.lookup(WorldState.getChapter())

    // The flags are a normal map of flag keys and values.
    Object.keys(stageData.flags||{}).forEach(flag => {
      GameFlags.set(flag,stageData.flags[flag]);
    });

    // TODO: The baseline bagged tiles is a code for a frequency map of bagged
    //       tiles. We might want to make this accept an array of codes as well
    //       to handle more complex games. We might also want to loop through
    //       the game flags to see what tiles have been enabled.
    if (stageData.baggedTiles) {
      TileBag.addBaggedTiles(structuredClone(ExtraRegistry.lookup(stageData.baggedTiles)));
    }

    if (stageData.sequentialTiles) {
      TileBag.addSequentialTiles(stageData.sequentialTiles.map(tileData => {
        return Tile(tileData);
      }));
    }

    // Shelved tiles just need the code and optional options for the normal
    // Tile constructor: [{ code,options }]
    (stageData.shelvedTiles||[]).forEach(tileData => {
      TileShelf.addTile(Tile(tileData));
    });

    // Placed tiles need the code, options, as well as the global (x,y)
    // coordinates for where the tiles should be placed: [{ x,y,code,options }]
    (stageData.placedTiles||[]).forEach(tileData => {
      DungeonGrid.setTile(
        Coordinates.fromGlobal(tileData.x,tileData.y),
        Tile(tileData));
    });

    if (stageData.buriedTreasure) {
      BuriedTreasure.addTreasures(stageData.buriedTreasure);
    }

    if (stageData.startingEvent) {
      GameFlags.set(SystemFlags.currentEvent,stageData.startingEvent);
    }

    await GameState.saveState();
  }

  // The openGame() function is called once the DungeonView has finished
  // loading. This needs to perform any tasks needed to put the recently
  // loaded game into the proper state.
  async function openGame() {
    if (GameFlags.has(SystemFlags.currentEvent)) {
      EventView.show(PagedEvent(GameFlags.get(SystemFlags.currentEvent)));
    }
  }

  // ===========================================================================

  // TODO: If we try and draw a tile, and there are no tiles in the bag
  //       this should trigger a game over event, for now we can just throw
  //       an exception reminding us to do this.
  async function drawTile() {
    if (TileBag.size() === 0) {
      throw `There are no more tiles left in the bag. Game over.`
    }

    if (TileShelf.isFull()) {
      forceDiscard();
    }

    const tile = TileBag.drawTile();

    if (tile.getDrawNote()) {
      Note.show(tile.getDrawNote());
    }

    if (tile.getDrawTrigger()) {
      TriggerRegistry.lookup(tile.getDrawTrigger()).triggerFunction();
    }

    TileBag.raiseHeat();
    TileShelf.addTile(tile);
    await TileShelfView.addTile(tile);
    TileShelfView.positionTiles();

    await Panopticon.induce(EventType.tileDrawn,{ tile });
    await GameState.saveState();

    log("Drew Tile",{ system:'GameController', code:tile.getCode(), id:tile.getID(), level:3 });
  }

  // TODO: If the shelf is full and we're forced to discard a tile the tile
  //       just disappears off of the shelf or out of your hand (if dragging)
  //       This should be more dramatic, something like an animation of the
  //       tile crumbling away or going up in flames.
  //
  // TODO: We also need to handle tiles that the player are forbidden from
  //       discarding, once we have something like that.
  function forceDiscard() {
    if (DragonDrop.isDragging()) { DragonDrop.stopDrag('cancel'); }
    if (TileBag.isSequence()) { throw `We cannot force discard when the tile bag has a tile sequence to play.` }

    TileShelfView.removeTile(TileShelf.discardLastTile());
    Panopticon.induce(EventType.tileDiscarded);
  }

  async function placeTile(coordinates,tile) {
    const placementData = {
      x: coordinates.gx,
      y: coordinates.gy,
      code: tile.getCode(),
      id: tile.getID() };

    try {
      log("Place Tile",{ system:'GameController', data:placementData , level:2 });

      Note.clear();
      InnerCellHighlight.hide();

      // Placing the tile will also set the coordinates, but I need to have
      // them set before attemptDiscovery() is called. I don't think there's
      // any harm in setting them twice though.
      tile.setCoordinates(coordinates);

      BuriedTreasure.attemptDiscovery(tile);
      DungeonGrid.setTile(coordinates, tile);
      DungeonView.placeTile(tile);

      // If a tile is placed programmatically (like the core tile) it will not
      // be on the shelf.
      if (TileShelf.hasTile(tile.getID())) {
        TileShelf.removeTile(tile.getID());
        TileShelfView.removeTile(tile.getID());
      }

      if (tile.getPlacementEvent()) {
        EventView.show(PagedEvent(tile.getPlacementEvent()))
      }
      if (tile.getPlacementTrigger()) {
        TriggerRegistry.lookup(tile.getPlacementTrigger()).triggerFunction(tile);
      }

      await Panopticon.induce(EventType.tilePlaced,{ tile });
      await GameState.saveState();
    }
    catch (error) {
      logError(`Error Placing Tile`, error, {
        system:'GameController',
        data:placementData
      });
    }
  }

  async function endEvent() {
    GameFlags.clear(SystemFlags.currentEvent);
    await GameState.saveState();
  }

  return Object.freeze({
    startNewGame,
    openGame,
    drawTile,
    placeTile,
    endEvent,
  });

})();
