EventRegistry.register('enter-the-dungeon', {

  stages:[{
    pages: [
      { text:`You go into the dungeon` },
    ]
  }],

  // Wipe tile board, place dungeon core tile, reset tile bag with starting tiles
  onFinish: state => {

    console.log("TODO: Clear and start")

    // GameState.clear();
    // GameBuilder.beginDefaultGame();
    // DungeonController.renderDungeon();
  },

});
