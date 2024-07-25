GameStageRegistry.register(_tutorial,{
  note:'tutorial.place-tile',

  flags: [
    ['dungeon-view.disable-movement',true],
    ['tile-shelf-view.hide-tile-bag',true]
  ],

  shelvedTiles:[
    { code:'forest-1', options:{
        placementEvent: 'game-start-1',
        placementRules: [_placeOnOrigin, _noRotate]}},
  ],

});
