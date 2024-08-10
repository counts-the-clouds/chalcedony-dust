GameStageRegistry.register(_tutorial,{

  flags: {
    'dungeon-view.disable-movement': true,
    'dungeon-view.hide-speed-control': true,
  },

  placedTiles:[
    { x:0, y:0, code:'dungeon-core' },
  ],

  baggedTiles: 'baseline',
  sequentialTiles:[
    { code:'baseline-h2-0', extra:{ drawTrigger:'tutorial.pause-and-zero', drawNote:'tutorial.connecting-tiles', placementEvent:'tutorial-start-2' }},
    { code:'baseline-r4-1', extra:{ drawTrigger:'tutorial.enable-speed-control', drawNote:'tutorial.speed-controls' }},
    { code:'baseline-h2-1', extra:{ drawNote:'tutorial.rotate-tile' }},
    { code:'baseline-r2-0', extra:{ drawTrigger:'tutorial.enable-movement', drawNote:'tutorial.pan-map' }},
  ],

  startingEvent:'tutorial-start-1',

});
