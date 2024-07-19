GameStageRegistry.register(_tutorial,{
  note:'baseline-game.place-tile',

  flags: [
    ['tile-bag.show',false]
  ],

  shelvedTiles:[
    { code:'forest-1', options:{
          placementEvent: 'game-start-1',
          placementRules: [_placeOnOrigin, _noRotate]}},
  ],

});
