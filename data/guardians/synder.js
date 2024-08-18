GuardianRegistry.register('wolfkin-hunter',{

  requirements:[
    { flagExists:'guardian.wolfkin.unlocked' }
  ],

  battle: {
    power: 7,
    toughness: 5,
    immuneTo: ['physical'],
    aspects:[
      { range:1 }
    ],
  }

});
