ResourceRegistry.register('labrynthian-mine',{
  displayName: 'Labrynthian Mine',
  resource: 'labrynthian-ore',

  view: {
    details: '(Labrynthian Mine Details)',
    background: 'ui/mine.png',
  },

  workerConfiguration: {
    slots: 1,
    requiredSkill: 'mining',
  },

  clockCode: 'mine-resource',

});
