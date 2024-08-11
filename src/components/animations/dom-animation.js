global.DomAnimation = function(id, element) {

  const $id = id;
  const $element = element;

  let $duration = 1000;
  let $easing = Easing.Linear.None;

  let $initialState;
  let $goal;
  let $tween;
  let $onComplete;

  function getID() { return $id; }
  function getElement() { return $element; }
  function setDuration(duration) { $duration = duration; }
  function setEasing(easing) { $easing = easing }
  function setInitialState(state) { $initialState = state; }
  function setGoal(goal) { $goal = goal; }

  function start() {
    $tween = new Tween($initialState)
    $tween.to($goal,$duration);
    $tween.easing($easing);
    $tween.start();

    $tween.onUpdate(properties => {
      const keys = Object.keys(properties);

      keys.forEach(key => {
        $element.style[key] = properties[key];
      })
    });

    $tween.onComplete(properties => {
      if (typeof $onComplete === 'function') { $onComplete(properties) }
      AnimationController.onComplete($id);
    });
  }

  function update() { if ($tween) { $tween.update(); } }
  function onComplete(callback) { $onComplete = callback; }

  return Object.freeze({
    getID,
    getElement,
    setDuration,
    setEasing,
    setInitialState,
    setGoal,
    start,
    update,
    onComplete,
  });

}