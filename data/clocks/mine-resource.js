ClockRegistry.register('mine-resource', {

  duration: 120000,
  repeat: true,

  // TODO: Right now we're just adding one resource per cycle. Potentially,
  //       there will be other ways to increase yield or have multiple minions
  //       assigned to the node and each should produce resources, perhaps
  //       depending on their skill and such.
  //
  // TODO: What to do if a resource cannot be added?
  //
  onComplete: clock => {
    const feature = FeatureDataStore.get(clock.getContext().featureID);
    const resource = feature.getConstruction().getResource();
    const assignments = MinionRoster.getAssignments(feature.getID());

    const total = Object.values(assignments).reduce((accumulator,code) => {
      return accumulator + Minion(code).getAspect('mining').getLevel();
    },0);

    if (GameInventory.canAddItem(resource)) {
      return GameInventory.addItem(resource, total);
    }
  }

});
