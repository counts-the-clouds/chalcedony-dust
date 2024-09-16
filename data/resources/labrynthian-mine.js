ResourceRegistry.register('labrynthian-mine',{
  displayName: 'Labrynthian Mine',
  resource: 'labrynthian-ore',

  view: {
    details: '(TODO: Labrynthian Mine Details)',
    background: 'features/mine.png',
  },

  slots:[
    { code:'miner', name:'Miner', requiredSkill:'mining' }
  ],

  clockCode: 'mine-resource',

});
