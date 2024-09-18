ResourceRegistry.register('labrynthian-mine',{
  displayName: 'Labrynthian Mine',
  resource: 'labrynthian-ore',

  view: {
    details: '(TODO: Labrynthian Mine Details)',
    background: 'features/mine.png',
  },

  workerSlots:[
    { code:'miner-1', name:'Miner', requiredSkill:'mining' },
    { code:'miner-2', name:'Miner', requiredSkill:'mining' }
  ],

  clockCode: 'mine-resource',

});
