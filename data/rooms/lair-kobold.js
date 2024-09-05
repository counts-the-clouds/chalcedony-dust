RoomRegistry.register('lair-kobold',{
  type: RoomType.lair,
  displayName: 'Kobold Lair',

  view: {
    type: 'lair',
    details: `(Kobold Lair Details)`,
  },

  lair: {
    species: 'kobold',
    cost: { mana:4 },
    minionsPerTile: 1,
  },

});
