GuardianRegistry.register('satyr-party-girl',{
  species: 'satyr',
  genders: ['female','futa'],

  requirements:[
    { flagExists:'feature.revel-grove-unlocked' }
  ],

  battle: {
    power: 3,
    toughness: 3,
    damageType: 'lust',
  }

});
