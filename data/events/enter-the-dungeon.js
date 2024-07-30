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

    TileBag.addBaggedTiles(TileBagRegistry.lookup('baseline'));

    GameController.placeTile(Coordinates.fromGlobal(0,0),Tile('dungeon-core'));
    DungeonViewport.setLocation(0,0);

    // TEMP: Really we want to start the draw timer here.
    GameController.drawTile();

  },

});
