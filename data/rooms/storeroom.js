RoomRegistry.register('storeroom',{
  type: RoomType.plain,
  displayName: 'Storeroom',

  view: {
    type: 'simple',
    layout: 'card-layout',
    background: 'ui/storeroom.png',
    details: `This storeroom is increasing the dungeon's storage capacity by {{@size}} units.`,
  },

});
