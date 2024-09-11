ResourceRegistry.register('draconian-mine',{
  displayName: 'Draconian Mine',
  resource: 'draconian-ore',

  view: {
    details: '(Draconian Mine Details)',
    background: 'ui/mine.png',
  },

  workerConfiguration: {
    slotCount: 1,
    requiredSkill: 'mining',
  },

  clockCode: 'mine-resource',

});
