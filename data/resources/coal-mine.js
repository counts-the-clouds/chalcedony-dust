ResourceRegistry.register('coal-mine',{
  displayName: 'Coal Mine',
  resource: 'coal',

  view: {
    details: '(TODO: Coal Mine Details)',
    background: 'features/mine.png',
  },

  workerSlots:[
    { code:'miner-1', name:'Miner', requiredSkill:'mining' },
    { code:'miner-2', name:'Miner', requiredSkill:'mining' }
  ],

  clockCode: 'mine-resource',

});
