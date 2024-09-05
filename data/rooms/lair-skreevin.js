RoomRegistry.register('lair-skreevin',{
  type: RoomType.lair,
  displayName: 'Skreevin Lair',

  view: {
    type: 'lair',
    details: `(Skreevin Lair Details)`,
  },

  lair: {
    species: 'skreevin',
    cost: { mana:3 },
    minionsPerTile: 1,
  },

});
