GuardianRegistry.register('centaur-trampler',{
  species: 'centaur',
  gender: 'male',

  requirements:[
    { flagExists:'guardian.centaurs.unlocked' }
  ],

  battle: {
    power: 6,
    toughness: 6,
    aspects: { fast:1 }
  }

});
