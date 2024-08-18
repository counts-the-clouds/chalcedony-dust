GuardianRegistry.register('synder',{

  unique: true,
  rarity: 'rare',

  description: `Holy shit. A dragon.`,

  character: {
    name: 'Synder',
    gender: 'female',
    personality: 'synder',
  },

  battle: {
    power: 8,
    toughness: 5,
    damageType: 'fire',
    immuneTo: ['fire'],
    aspects:[
      { range:1 }
    ],
  }

});
