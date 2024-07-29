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

    const core = Tile('dungeon-core',{})
          core.buildSegments()

    TileBag.addBaggedTiles(TileBags.baseline);

    GameController.placeTile(Coordinates.fromGlobal(0,0),core);
    GameController.drawTile();
  },

});
