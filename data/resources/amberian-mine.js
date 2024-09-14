ResourceRegistry.register('amberian-mine',{
  displayName: 'Amberian Mine',
  resource: 'amberian-ore',

  view: {
    details: '(Amberian Mine Details)',
    background: 'features/mine.png',
  },

  slots:[
    { code:'miner', name:'Miner', requiredSkill:'mining' }
  ],

  clockCode: 'mine-resource',

});
