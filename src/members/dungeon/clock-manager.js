global.ClockManager = (function() {

  let $clocks = {};
  let $clockSpeed = 1;

  function reset() { $clocks = {}; }

  // If a clock is attached to a tile we should use the tile's id as the clock
  // id. If there should only be one of these clocks in the game at once then
  // the clock code can be used as the id.
  function addClock(id, code=null) {
    if (code == null) { code = id; }
    $clocks[id] = Clock({ id, code });
  }

  function removeClock(id) {
    delete $clocks[id];
  }

  function setClockSpeed(speed) {
    $clockSpeed = speed;
  }

  function onTick(time) {
    const ms = time.elapsedMS * $clockSpeed;

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

  return Object.freeze({
    reset,
    addClock,
    removeClock,
    setClockSpeed,
    onTick,
  })

})();