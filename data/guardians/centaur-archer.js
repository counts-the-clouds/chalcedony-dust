GuardianRegistry.register('centaur-archer',{

  requirements:[
    { flagExists:'guardian.centaurs.unlocked' }
  ],

  battle: {
    power: 4,
    toughness: 6,
    aspects:[
      { range:2 }, { fast:1 }
    ],
  }

});
