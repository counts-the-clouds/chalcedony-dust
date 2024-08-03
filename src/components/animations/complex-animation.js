global.ComplexAnimation = function(id) {

  const $id = id;

  // A complex animation is actually more simple than the other animation types.
  // It's mostly just a passthrough to the Tween library, but with the same
  // interface that the other animation classes have so that it works with the
  // AnimationController.

  let $tween;
  let $initialState;
  let $targetState;

  let $delay = 0;
  let $duration = 1000;
  let $easing = Easing.Linear.None;

  let $onUpdate;
  let $onComplete;
  let $onStop;

  function getID() { return $id; }
  function setDelay(delay) { $delay = delay; }
  function setDuration(duration) { $duration = duration; }
  function setEasing(easing) { $easing = easing }
  function setInitialState(state) { $initialState = state; }
  function setTargetState(state) { $targetState = state; }

  function start() {
    $tween = new Tween($initialState)
    $tween.to($targetState);
    $tween.duration($duration);
    $tween.delay($delay);
    $tween.easing($easing);
    $tween.start();

    $tween.onUpdate(properties => {
      if (typeof $onUpdate === 'function') { $onUpdate(properties); }
    });

    $tween.onComplete(properties => {
      if (typeof $onComplete === 'function') { $onComplete(properties) }
      AnimationController.onComplete($id);
    });
  }

  function update() {
    if ($tween) { $tween.update(); }
  }

  function stop() {
    $tween.stop();
    if (typeof $onStop === 'function') { $onStop($id) }
  }

  function onUpdate(callback) { $onUpdate = callback; }
  function onComplete(callback) { $onComplete = callback; }
  function onStop(callback) { $onStop = callback; }

  return Object.freeze({
    getID,
    setDelay,
    setDuration,
    setEasing,
    setInitialState,
    setTargetState,
    start,
    update,
    stop,
    onUpdate,
    onComplete,
    onStop,
  });
}
