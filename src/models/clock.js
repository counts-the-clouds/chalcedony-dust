global.Clock = function(data) {
  const $id = data.id || ClockDataStore.nextID();
  const $code = data.code;

  Validate.exists('code',$code);

  const clockData = ClockRegistry.lookup($code);

  let $duration = data.duration || clockData.duration;
  let $repeat = (data.repeat != null) ? data.repeat : clockData.repeat;
  let $elapsedTime = data.elapsedTime || 0;
  let $context = data.context;
  let $parent = data.parent;

  // When we add the clock to the manager, we store whatever UI component
  // we'll need to update when onUpdate() is called. These values are not
  // persisted and should be recreated when the game is loaded.
  let $tileContainer;
  let $tileLayers;

  if ($repeat == null) { $repeat = false; }

  // ===========================================================================

  function getID() { return $id; }
  function getCode() { return $code; }

  function setDuration(duration) { $duration = duration }
  function getDuration() { return $duration }

  function setRepeat(repeat) { $repeat = repeat; }
  function getRepeat() { return $repeat; }

  function setElapsedTime(time) { $elapsedTime = time; }
  function getElapsedTime() { return $elapsedTime; }

  function setContext(context) { $context = context; }
  function getContext() { return $context; }

  // Parent should have the form: { type:'Type', id:0 } with id being optional
  // unless the parent is a model.
  function setParent(parent) { $parent = parent; }
  function getParent() { return $parent; }

  function setTileContainer(tileContainer) { $tileContainer = tileContainer; }
  function getTileContainer() { return $tileContainer; }
  function setTileLayers(layers) { $tileLayers = layers; }
  function getTileLayers() { return $tileLayers; }

  function onUpdate() {
    const progress = (getElapsedTime() / getDuration()) * 100;

    if ($parent.type === 'TileShelfView') {
      return TileShelfView.updateProgressBar(progress);
    }

    if ($tileLayers) {
      return $tileLayers.forEach(layer => layer.updatePulse());
    }

    if ($tileContainer) {
      return $tileContainer.updateClock(progress);
    }
  }

  async function onComplete() {
    const clockData = ClockRegistry.lookup($code);
    await clockData.onComplete($self);

    if ($repeat === false) {
      ClockManager.removeClock(getID());
      ClockDataStore.remove(getID());

      if ($tileContainer) {
        $tileContainer.disableClock();
      }

      log(`${toString()} completed and removed`,{ system:'Clock' });
    }
  }

  function toString() {
    return `Clock:${$id}[${$code}]`
  }

  function pack() {
    return {
      id: $id,
      code: $code,
      duration: $duration,
      repeat: $repeat,
      elapsedTime: $elapsedTime,
      context: $context,
      parent: $parent,
    }
  }

  // ===========================================================================

  const $self = Object.freeze({
    getID,
    getCode,
    setDuration,
    getDuration,
    setRepeat,
    getRepeat,
    setElapsedTime,
    getElapsedTime,
    setContext,
    getContext,
    setParent,
    getParent,
    setTileContainer,
    getTileContainer,
    setTileLayers,
    getTileLayers,
    onUpdate,
    onComplete,
    toString,
    pack,
  });

  ClockDataStore.store($self);

  return $self;
}
