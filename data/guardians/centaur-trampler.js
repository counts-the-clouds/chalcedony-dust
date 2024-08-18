GuardianRegistry.register('centaur-trampler',{

  requirements:[
    { flagExists:'guardian.centaurs.unlocked' }
  ],

  battle: {
    power: 6,
    toughness: 6,
    aspects:[
      { fast:1 }
    ],
  }

});
