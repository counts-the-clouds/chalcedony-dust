ResourceRegistry.register('labrynthian-mine',{
  displayName: 'Labrynthian Mine',
  resource: 'labrynthian-ore',

  view: {
    details: '(Labrynthian Mine Details)',
    background: 'ui/mine.png',
  },

  slots:[
    { code:'miner', name:'Miner', requiredSkill:'mining' }
  ],

  clockCode: 'mine-resource',

});
