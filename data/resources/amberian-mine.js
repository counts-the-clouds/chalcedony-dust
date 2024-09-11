ResourceRegistry.register('amberian-mine',{
  displayName: 'Amberian Mine',
  resource: 'amberian-ore',

  view: {
    details: '(Amberian Mine Details)',
    background: 'ui/mine.png',
  },

  workerConfiguration: {
    slotCount: 1,
    requiredSkill: 'mining',
  },

  clockCode: 'mine-resource',

});
