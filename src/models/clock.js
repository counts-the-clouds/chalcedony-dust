global.Clock = function(options) {

  const $id = options.id || ClockDataStore.nextID();
  const $code = options.code;

  let $elapsedTime = options.elapsedTime || 0;
  let $tileContainer;

  // ===========================================================================

  function getID() { return $id; }
  function getCode() { return $code; }
  function getClockData() { return ClockRegistry.lookup($code); }
  function getDuration() { return getClockData().duration; }
  function getRepeat() { return getClockData().repeat || false; }

  function getElapsedTime() { return $elapsedTime; }
  function setElapsedTime(time) { $elapsedTime = time; }

  function onUpdate() {
    if ($tileContainer) {
      $tileContainer.updateClock((getElapsedTime() / getDuration()) * 100);
    }
  }

  function onComplete() { getClockData().onComplete(this); }

  function attachTileContainer(tileContainer) { $tileContainer = tileContainer; }
  function getTileContainer() { return $tileContainer; }

  function toString() {
    return `Clock:${$id}[${$code}]`
  }

  function pack() {
    return {
      id: $id,
      code: $code,
      elapsedTime: $elapsedTime,
    }
  }

  // ===========================================================================

  const $self = Object.freeze({
    getID,
    getCode,
    getDuration,
    getRepeat,
    getElapsedTime,
    setElapsedTime,
    onUpdate,
    onComplete,
    attachTileContainer,
    getTileContainer,
    toString,
    pack,
  });

  ClockDataStore.store($self);

  return $self;
}
