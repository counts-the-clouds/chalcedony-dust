ResourceRegistry.register('draconian-mine',{
  displayName: 'Draconian Mine',
  resource: 'draconian-ore',

  view: {
    details: '(Draconian Mine Details)',
    background: 'ui/mine.png',
  },

  slots:[
    { code:'miner', name:'Miner', requiredSkill:'mining' }
  ],

  clockCode: 'mine-resource',

});
