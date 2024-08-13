
TriggerRegistry.register('tutorial.pause-and-zero', {
  triggerFunction: () => {
    const clock = ClockManager.findByCode('generate-tile')[0];
    ClockManager.pause();
    ClockManager.zeroClock(clock.getID());
  }
});

TriggerRegistry.register('tutorial.enable-speed-control', {
  triggerFunction: () => {
    const clock = ClockManager.findByCode('generate-tile')[0];
    GameFlags.clear(_hideSpeedControl);
    ClockManager.pause();
    ClockManager.zeroClock(clock.getID());
    SpeedControl.show();
  }
});

TriggerRegistry.register('tutorial.enable-movement', {
  triggerFunction: () => {
    GameFlags.clear(_disableMovement);
  }
});
