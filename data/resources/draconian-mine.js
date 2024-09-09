ResourceRegistry.register('draconian-mine',{
  displayName: 'Draconian Mine',
  resource: 'draconian-ore',

  view: {
    details: '(Draconian Mine Details)',
    background: 'ui/mine.png',
  },

  workerConfiguration: {
    slots: 1,
  },

  clockCode: 'mine-resource',

});
