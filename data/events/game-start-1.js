EventRegistry.register('game-start-1', {

  stages:[{
    pages: [
      { text:`You wake up in a thickly wooded forest at the bottom of a cliff. You are the only survivor of an
              animal attack on your caravan. You hear howling off in the distance and need to find shelter quickly.` },
      { text:`This game will end if you run out of options. Fortunately you can see a narrow trail that leads south,
              deeper into the woods.` },
    ]
  }],

  onServerFinish: state => {
    rotateNote = { code:'baseline-game.rotate-tile', when:_drawn }
    panNote = { code:'baseline-game.pan-map', when:_drawn }

    let tiles = [
      { code:'forest-2', options:{ }},
      { code:'forest-3', options:{ enableNote:rotateNote, placementTrigger:'baseline-game.enable-movement' }},
      { code:'forest-2', options:{ enableNote:panNote }},
      { code:'forest-3', options:{ placementEvent:'game-start-2' }},
      { code:'forest-1', options:{ placementEvent:'enter-the-dungeon' }},
    ];

    TileBag.startSequence({ background:'/tile-bag/forest-path-sequence.png' });
    TileBag.addSequentialTiles(tiles.map(data => {
      return Tile(data.code, data.options);
    }));

    Browser.send('trigger',{ code:'baseline-game.enable-tile-bag' });
  },

});
