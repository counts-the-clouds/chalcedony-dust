GuardianRegistry.register('fresh-baked-bread',{
  gender: Gender.female,
  species: 'kobold',
  firstName: 'Fresh-Baked-Bread',

  aspects: {
    heart: 4,
    grail: 2,
  },

  images: {
    default:'characters/fresh-baked-bread.png',
  },

  summonDetails: {
    default: `While it's true that the majority of kobolds are devious little bastards Fresh-Baked-Bread is a kind and gentle soul. While she's not what most
      people would consider a proper dungeon guardian, her presence makes the dungeon a more enjoyable place to live. You kobold minions especially would
      welcome her cooking and... other skills.`,
  },

  windowTextOptions: [
    { conditions:[Condition.avatarNone()], text:`TODO: Fresh-Baked-Bread's window text.` }
  ],

});
