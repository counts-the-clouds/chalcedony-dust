global.Clock = function(data) {

  const $id = data.id || ClockDataStore.nextID();
  const $code = data.code;

  let $duration = data.duration || ClockRegistry.lookup($code).duration;
  let $elapsedTime = data.elapsedTime || 0;
  let $context = data.context;
  let $tileContainer;

  // ===========================================================================

  function getID() { return $id; }
  function getCode() { return $code; }
  function getClockData() { return ClockRegistry.lookup($code); }
  function setContext(context) { $context = context; }
  function getContext() { return $context; }
  function setDuration(duration) { $duration = duration }
  function getDuration() { return $duration }
  function getRepeat() { return getClockData().repeat || false; }
  function getElapsedTime() { return $elapsedTime; }
  function setElapsedTime(time) { $elapsedTime = time; }
  function start() { ClockManager.addClock($self); }

  function onUpdate() {
    const progress = (getElapsedTime() / getDuration()) * 100;

    if ($tileContainer) {
      return $tileContainer.updateClock(progress);
    }

    // TODO: The clock needs to know what tile it belongs to, or if it belongs to some other object.
    TileShelfView.updateProgressBar(progress);


  }

  function onComplete() { getClockData().onComplete($self); }
  function attachTileContainer(tileContainer) { $tileContainer = tileContainer; }
  function getTileContainer() { return $tileContainer; }

  function toString() {
    return `Clock:${$id}[${$code}]`
  }

  function pack() {
    return {
      id: $id,
      code: $code,
      duration: $duration,
      elapsedTime: $elapsedTime,
      context: $context,
    }
  }

  // ===========================================================================

  const $self = Object.freeze({
    getID,
    getCode,
    setContext,
    getContext,
    setDuration,
    getDuration,
    getRepeat,
    getElapsedTime,
    setElapsedTime,
    start,
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
