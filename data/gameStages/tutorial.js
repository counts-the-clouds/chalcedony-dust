GameStageRegistry.register(_tutorial,{

  flags: {
    'dungeon-view.disable-movement': true,
  },

  placedTiles:[
    { x:0, y:0, code:'dungeon-core' },
  ],

  baggedTiles: 'baseline',
  sequentialTiles:[
    { code:'baseline-h2-0', rotation:1, extra:{ drawNote:'tutorial.connecting-tiles' }},
    { code:'baseline-h1-r1-0', extra:{ placementEvent:'tutorial-start-2' }},
      // extra:{ drawNote:'tutorial.rotate-tile', placementTrigger:'tutorial.enable-movement' }},
  ],

  startingEvent:'tutorial-start-1',

});
