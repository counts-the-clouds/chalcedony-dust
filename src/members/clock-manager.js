global.ClockManager = (function() {

  const SPEED_FACTORS = { 0:0, 1:1, 2:3.33, 3:10 };

  let $clocks = {};
  let $clockSpeed = 1;
  let $previousSpeed = 1;

  function init() {
    X.registerKeyAction('action.pause',canChangeSpeed,togglePause)
    X.registerKeyAction('action.set-speed-1',canChangeSpeed,() => { setClockSpeed(1); });
    X.registerKeyAction('action.set-speed-2',canChangeSpeed,() => { setClockSpeed(2); });
    X.registerKeyAction('action.set-speed-3',canChangeSpeed,() => { setClockSpeed(3); });
  }

  function reset() { $clocks = {}; }
  function addClock(clock) { $clocks[clock.getID()] = clock; }
  function removeClock(id) { delete $clocks[id]; }

  function onTick(time) {
    const ms = time.elapsedMS * SPEED_FACTORS[$clockSpeed];

    if (ms > 0) {
      Object.values($clocks).forEach(clock => {
        const elapsed = clock.getElapsedTime() + ms;
        (elapsed >= clock.getDuration()) ? onComplete(clock) : onUpdate(clock,elapsed);
      });
    }
  }

  function onComplete(clock) {
    clock.setElapsedTime(clock.getDuration());
    clock.onComplete();

    if (clock.getRepeat()) {
      return clock.setElapsedTime(0);
    }

    removeClock(clock.getID());
  }

  function onUpdate(clock, elapsed) {
    clock.setElapsedTime(elapsed);
    clock.onUpdate();
  }

  // === Clock Speed ==========================================================
  //
  // TODO: Certain actions like showing an event will force pause the game.
  //       If that happens we shouldn't allow speed changes using the keyboard
  //       shortcuts.
  //
  function canChangeSpeed() { return DungeonView.isVisible() }

  function togglePause() {
    if ($clockSpeed === 0) {
      $clockSpeed = $previousSpeed;
      return SpeedControl.activate($clockSpeed);
    }

    if ($clockSpeed > 0) {
      $previousSpeed = $clockSpeed;
      $clockSpeed = 0
      SpeedControl.activate(0);
    }
  }

  function setClockSpeed(speed) {
    $previousSpeed = $clockSpeed;
    $clockSpeed = speed
    SpeedControl.activate(speed);
  }

  return Object.freeze({
    init,
    reset,
    addClock,
    removeClock,
    setClockSpeed,
    onTick,
  })

})();