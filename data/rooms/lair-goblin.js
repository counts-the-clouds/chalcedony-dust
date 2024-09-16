RoomRegistry.register('lair-goblin',{
  displayName: 'Goblin Lair',
  lair: 'goblin',

  view: {
    type: 'simple',
    layout: 'card-layout',
    background: 'features/lair-goblin.png',
    details: `(Goblin Lair Details) {{@minionCount}} {{@minionPluralName}}`,
  },

});
