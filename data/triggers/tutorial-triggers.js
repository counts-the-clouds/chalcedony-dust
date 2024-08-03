TriggerRegistry.register('tutorial.enable-movement', {
  triggerFunction: () => {
    GameFlags.clear('dungeon-view.disable-movement');
  }
});
