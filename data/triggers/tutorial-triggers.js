
TriggerRegistry.register('tutorial.pause-and-zero', {
  triggerFunction: () => {
    ClockManager.pause();
    ClockManager.zeroClock('generate-tile');
  }
});

TriggerRegistry.register('tutorial.enable-speed-control', {
  triggerFunction: () => {
    GameFlags.clear('dungeon-view.hide-speed-control');
    SpeedControl.show();
  }
});

TriggerRegistry.register('tutorial.enable-movement', {
  triggerFunction: () => {
    GameFlags.clear('dungeon-view.disable-movement');
  }
});
