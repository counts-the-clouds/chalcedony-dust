TriggerRegistry.register('tutorial.enable-movement', {
  triggerFunction: () => {
    GameState.clearFlag('dungeon-view.disable-movement');
  }
});
