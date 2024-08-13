ExtraRegistry.register(_tutorialStage,{

  flags: {
    'buried-treasure.forbid-discovery': true,
    'dungeon-view.disable-movement': true,
    'dungeon-view.hide-speed-control': true,
  },

  buriedTreasure: 'baseline-treasures',
  baggedTiles: 'baseline-tiles',
  sequentialTiles:[
    { code:'baseline-h2-0', extra:{ drawTrigger:'tutorial.pause-and-zero', drawNote:'tutorial.connecting-tiles', placementEvent:'tutorial-start-2' }},
    { code:'baseline-h2-1', extra:{ drawTrigger:'tutorial.enable-speed-control', drawNote:'tutorial.speed-controls' }},
    { code:'baseline-r2-3', extra:{ drawNote:'tutorial.rotate-tile' }},
    { code:'baseline-r2-1', extra:{ drawTrigger:'tutorial.enable-movement', drawNote:'tutorial.pan-map' }},
    { code:'baseline-h1-r1-0', extra:{ placementEvent:'tutorial-start-3' }},
  ],

  placedTiles:[
    { x:0, y:0, code:'dungeon-core' },
  ],

  startingEvent:'tutorial-start-1',

});
