GuardianRegistry.register('incubus',{

  requirements:[
    { flagExists:'guardian.demons.unlocked' }
  ],

  battle: {
    power: 4,
    toughness: 4,
    damageType: 'lust',
  }

});
