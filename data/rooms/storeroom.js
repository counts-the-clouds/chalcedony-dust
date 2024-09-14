RoomRegistry.register('storeroom',{
  displayName: 'Storeroom',

  view: {
    type: 'simple',
    layout: 'card-layout',
    background: 'features/storeroom.png',
    details: `This storeroom is increasing the dungeon's storage capacity by {{@size}} units.`,
  },

});
