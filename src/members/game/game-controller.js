global.GameController = (function() {

  // The beginGame() first gets the current chapter from the world state. This
  // chapter information will probably have other flags and things set,
  // representing features that the player has unlocked. For now a chapter only
  // includes the name of the game stage to load.
  async function beginGame() {
    await GameState.reset();

    const stage = GameStageRegistry.lookup(WorldState.getChapter());

    // await GameState.saveState();
    // DungeonController.renderDungeon();
  }

  function setStage(stageData) {

  }

  // function beginBaselineGame() {
  //   GameState.setFlag('tile-bag.show',false);

  //   let startingTile = Tile('forest-1',{
  //     placementEvent: 'game-start-1',
  //     placementRules: [_placeOnOrigin, _noRotate],
  //   });
  //   startingTile.buildSegments();

  //   TileShelf.addTile(startingTile);
  //   NoteController.show('baseline-game.place-tile');
  // }

  // function beginDefaultGame() {
  //   let coreTile = Tile('dungeon-core',{});
  //       coreTile.buildSegments();

  //   DungeonGrid.setCell(Coordinates.fromGlobal(0,0), coreTile);
  // }

  return Object.freeze({
    beginGame,
    setStage,
  });

})();
