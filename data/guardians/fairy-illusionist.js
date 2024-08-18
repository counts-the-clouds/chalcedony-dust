GuardianRegistry.register('fairy-illusionist',{

  requirements:[
    { flagExists:'feature.revel-grove-unlocked' }
  ],

  battle: {
    power: 3,
    toughness: 1,
    damageType: 'psychic',
    aspects:[
      { stealth:3 }
    ],
  }

});
