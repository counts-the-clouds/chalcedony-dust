GuardianRegistry.register('succubus',{
  species: 'succubus',
  genders: ['female','futa'],

  requirements:[
    { flagExists:'guardian.demons.unlocked' }
  ],

  battle: {
    power: 5,
    toughness: 3,
    damageType: 'lust',
  }

});
