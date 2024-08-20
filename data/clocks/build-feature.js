ClockRegistry.register('build-feature', {

  onComplete: async clock => {
    const feature = FeatureDataStore.get(clock.getParent().id);
    feature.setState(FeatureState.constructed);
    feature.applyTint(FeatureState.constructed);

    await GameState.saveState();
  }

});