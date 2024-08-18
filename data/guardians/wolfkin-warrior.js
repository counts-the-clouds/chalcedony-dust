GuardianRegistry.register('wolfkin-warrior',{

  requirements:[
    { flagExists:'guardian.wolfkin.unlocked' }
  ],

  battle: {
    power: 6,
    toughness: 6,
    immuneTo: ['physical'],
    aspects:[
      { rage:1 }
    ],
  }

});
