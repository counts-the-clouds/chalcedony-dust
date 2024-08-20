ClockRegistry.register('build-feature', {

  onComplete: async clock => {
    const feature = FeatureDataStore.get(clock.getContext().featureID);
    console.log("Completed The Build Feature Clock...");
    console.log(`Feature here is ${feature}`)

    await GameState.saveState();
  }

});