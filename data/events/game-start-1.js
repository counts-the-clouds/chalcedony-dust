EventRegistry.register('game-start-1', {

  stages:[{
    pages: [
      { text:`You wake up in a thickly wooded forest at the bottom of a cliff. You are the only survivor of an
              animal attack on your caravan. You hear howling off in the distance and need to find shelter quickly.` },
      { text:`This game will end if you run out of options. Fortunately you can see a narrow trail that leads south,
              deeper into the woods.` },
    ]
  }],

  onFinish: state => {
    let tiles = [
      { code:'forest-2', options:{ drawNote:'tutorial.connecting-tiles' }},
      { code:'forest-3', options:{ drawNote:'tutorial.rotate-tile', placementTrigger:'tutorial.enable-movement' }},
      { code:'forest-4', options:{ drawNote:'tutorial.pan-map' }},
      { code:'forest-5', options:{ placementEvent:'game-start-2' }},
      { code:'forest-6', options:{ placementEvent:'enter-the-dungeon' }},
    ];

    TileBag.startSequence({ background:'/tile-bag/forest-path-sequence.png' });
    TileBag.addSequentialTiles(tiles.map(data => {
      return Tile(data.code, data.options);
    }));

    TileShelfView.showTileBag();

    // TODO: We'll need to adjust the generate tile clock here so it does the
    //       right thing.
  },

});
