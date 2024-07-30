EventRegistry.register('enter-the-dungeon', {

  stages:[{
    pages: [
      { text:`You go into the dungeon` },
    ]
  }],

  // Wipe tile board, place dungeon core tile, reset tile bag with starting
  // tiles.
  onFinish: state => {
    GameState.reset();
    DungeonView.reset();

    TileBag.addBaggedTiles(TileBags.baseline);

    GameController.placeTile(Coordinates.fromGlobal(0,0),Tile('dungeon-core'));

    // TEMP: Really we want to start the draw timer here.
    GameController.drawTile();
  },

});
