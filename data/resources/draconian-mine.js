ResourceRegistry.register('draconian-mine',{
  displayName: 'Draconian Mine',
  resource: 'draconian-ore',

  view: {
    details: '(TODO: Draconian Mine Details)',
    background: 'features/mine.png',
  },

  workerSlots:[
    { code:'miner-1', name:'Miner', requiredSkill:'mining' },
    { code:'miner-2', name:'Miner', requiredSkill:'mining' }
  ],

  clockCode: 'mine-resource',

});
