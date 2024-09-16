ResourceRegistry.register('coal-mine',{
  displayName: 'Coal Mine',
  resource: 'coal',

  view: {
    details: '(TODO: Coal Mine Details)',
    background: 'features/mine.png',
  },

  slots:[
    { code:'miner', name:'Miner', requiredSkill:'mining' }
  ],

  clockCode: 'mine-resource',

});
