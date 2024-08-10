EventRegistry.register('tutorial-start-3', {

  stages:[{
    pages: [
      { text:`Something has been completed... but I should actually figure out was just completed first.` },
    ]
  }],

  onBefore: context => {
    FeatureDataStore.all().forEach(feature => {
      if (feature.isComplete()) {
        context.featureType = feature.getType();
      }
    });

    return context;
  }

});
