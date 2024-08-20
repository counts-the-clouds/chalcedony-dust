global.ClockManager = (function() {

  const SPEED_FACTORS = { 0:0, 1:1, 2:3.33, 3:10, 4:30 };

  let $clocks = {};
  let $clockSpeed = 1;
  let $previousSpeed = 1;
  let $forcePaused = false;

  function init() {
    X.registerKeyAction('action.pause',canChangeSpeed,togglePause)
    X.registerKeyAction('action.set-speed-1',canChangeSpeed,() => { setClockSpeed(1); });
    X.registerKeyAction('action.set-speed-2',canChangeSpeed,() => { setClockSpeed(2); });
    X.registerKeyAction('action.set-speed-3',canChangeSpeed,() => { setClockSpeed(3); });
  }

  function reset() {
    $clocks = {};
    $clockSpeed = 1;
    $previousSpeed = 1;
    $forcePaused = false;
  }

  // This is called when the game is started to take all the clock models and
  // add them into the manager. I don't think there's a case where we want to
  // create a clock but not have it running, except in the tests obviously.
  function manageAllClocks() {
    ClockDataStore.all().forEach(clock => {
      addClock(clock);
    });
  }

  // Adding a clock to the manager should also build the UI element for the
  // clock if that clock is associated with a tile.
  function addClock(clock) {
    $clocks[clock.getID()] = clock;

    const parent = clock.getParent();
    if (parent.type === 'Tile') {
      TileContainer.forTile(TileDataStore.get(parent.id)).enableClock(clock);
    }
  }

  function getClock(id) { return $clocks[id]; }
  function removeClock(id) { delete $clocks[id]; }

  function findByCode(code) {
    return Object.values($clocks).filter(clock => clock.getCode() === code);
  }

  function zeroClock(id) {
    const clock = getClock(id)
          clock.setElapsedTime(0);
          clock.onUpdate();
  }

  // Pausing like this should be done sparingly. The only reason I'm including
  // this is for the situation where we're in a tile sequence, and we can't
  // force discard a tile. This will stop the clock (and all other clocks)
  // from generating new tiles until the shelf has room.
  function pauseUntil(condition) {
    $forcePaused = true;
    setClockSpeed(0);

    const interval = setInterval(() => {
      if (condition()) {
        clearInterval(interval);
        $forcePaused = false;
        togglePause();
      }
    },100);
  }

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
      clock.setElapsedTime(0);
    }
  }

  function onUpdate(clock, elapsed) {
    clock.setElapsedTime(elapsed);
    clock.onUpdate();
  }

  // === Clock Speed ==========================================================

  function canChangeSpeed() {
    if ($forcePaused) { return false }
    if (EventView.isVisible()) { return false }
    if (!SpeedControl.isVisible()) { return false }
    return DungeonView.isVisible()
  }

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

  function pause() {
    setClockSpeed(0);
    SpeedControl.activate(0);
  }

  function getClockSpeed() { return $clockSpeed; }

  function setClockSpeed(speed) {
    if ($clockSpeed !== speed) {
      $previousSpeed = $clockSpeed;
      $clockSpeed = speed
      SpeedControl.activate(speed);
    }
  }

  return Object.freeze({
    init,
    reset,
    manageAllClocks,
    addClock,
    getClock,
    findByCode,
    removeClock,
    pauseUntil,
    zeroClock,
    canChangeSpeed,
    togglePause,
    pause,
    getClockSpeed,
    setClockSpeed,
    onTick,
  })

})();