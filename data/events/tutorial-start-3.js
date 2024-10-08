EventRegistry.register('tutorial-start-3', {

  stages:[{
    showWhenEqual:['type',TileType.hall],
    pages: [
      { text:`The rough stone walls of the corridor seem to straighten and expand as it opens into the newly formed
              space. The hall that was little more than a roughly carved passageway though the stone now looks more
              complete, though still empty, waiting to be filled with deadly traps.` },
    ]
  },{
    showWhenEqual:['type',TileType.room],
    pages: [
      { text:`The rough stone walls of the room seem to straighten and expand as it opens into the newly formed
              space. The room that was little more than a roughly hollowed out cavern now looks more complete, though
              still empty, waiting to be filled with minions and the machinery of a working dungeon.` },

    ],
  }],

  onBefore: context => {
    FeatureDataStore.all().forEach(feature => {
      if (feature.getState() === FeatureState.complete) { context.type = feature.getType(); }
    });

    return context;
  },

  onFinish: () => {
    GameFlags.clear(SystemFlags.forbidDiscovery);
  }

});
