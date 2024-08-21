ClockRegistry.register('build-feature', {

  onComplete: clock => {
    FeatureDataStore.get(clock.getParent().id).completeConstruction(clock.getContext().code);
  }

});