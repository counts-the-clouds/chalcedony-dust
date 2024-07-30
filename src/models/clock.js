global.Clock = function(options) {

  const $id = options.id;
  const $code = options.code;

  let $elapsedTime = options.elapsedTime || 0;

  function getID() { return $id; }
  function getCode() { return $code; }
  function getClockData() { return ClockRegistry.lookup($code); }
  function getDuration() { return getClockData().duration; }
  function getRepeat() { return getClockData().repeat || false; }

  function getElapsedTime() { return $elapsedTime; }
  function setElapsedTime(time) { $elapsedTime = time; }

  function onUpdate() { getClockData().onUpdate(this); }
  function onComplete() { getClockData().onComplete(this); }

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
    pack,
  });
}
