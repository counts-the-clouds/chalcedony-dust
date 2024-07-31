global.Clock = function(options) {

  // A clock can be built with a code, an id, or usually both. If a clock is
  // attached to a tile we should use the tile's id as the clock id. If there
  // should only be one of these clocks in the game at once then the clock code
  // can be used as the id.
  const $id = options.id || options.code;
  const $code = options.code || options.id;

  let $elapsedTime = options.elapsedTime || 0;
  let $tileContainer;

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

  function pack() {
    return {
      id: $id,
      code: $code,
      elapsedTime: $elapsedTime,
    }
  }

  return Object.freeze({
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
    pack,
  });
}
