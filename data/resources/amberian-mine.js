ResourceRegistry.register('amberian-mine',{
  displayName: 'Amberian Mine',
  resource: 'amberian-ore',

  view: {
    details: '(TODO: Amberian Mine Details)',
    background: 'features/mine.png',
  },

  workerSlots:[
    { code:'miner-1', name:'Miner', requiredSkill:'mining' },
    { code:'miner-2', name:'Miner', requiredSkill:'mining' }
  ],

  clockCode: 'mine-resource',

});
