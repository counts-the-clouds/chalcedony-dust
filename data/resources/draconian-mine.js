ResourceRegistry.register('draconian-mine',{
  displayName: 'Draconian Mine',
  resource: 'draconian-ore',

  view: {
    details: '(TODO: Draconian Mine Details)',
    background: 'features/mine.png',
  },

  slots:[
    { code:'miner', name:'Miner', requiredSkill:'mining' }
  ],

  clockCode: 'mine-resource',

});
