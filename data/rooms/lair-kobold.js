RoomRegistry.register('lair-kobold',{
  isLair: true,
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
