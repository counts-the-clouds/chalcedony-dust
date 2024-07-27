global.ResoluteAnimation = function (id, target) {

  const $id = id;
  const $target = target;

  let $duration = 1000;
  let $easing = Easing.Linear.None;

  let $initialState;
  let $goal;
  let $tween;
  let $onComplete;

  function getID() { return $id; }
  function getTarget() { return $target; }
  function setDuration(duration) { $duration = duration; }
  function setEasing(easing) { $easing = easing }

  // TODO: The idea behind the resolute animation is that it's goal driven. If
  //       we update the goal while the animation is playing it should animate
  //       towards the new goal. This should stop the tween, get the current
  //       animatable properties and restart the tween. The duration will need
  //       adjusted somehow as well. It could either be a percentage of what
  //       has already been played, or setting the goal could optionally add
  //       more time or set its own duration. Not sure yet until we actually
  //       implement something that does this.
  //
  function setGoal(goal) {
    $goal = goal;
    $initialState = {};

    Object.keys(goal).forEach(key => {
      $initialState[key] = $target[key];
    });
  }

  function start() {
    $tween = new Tween($initialState)
    $tween.to($goal,$duration);
    $tween.easing($easing);
    $tween.start();

    $tween.onUpdate(properties => {
      Object.keys(properties).forEach(key => {
        $target[key] = properties[key];
      })
    });

    $tween.onComplete(properties => {
      if (typeof $onComplete === 'function') { $onComplete(properties) }
      AnimationController.onComplete($id);
    });
  }

  function update() {
    if ($tween) { $tween.update(); }
  }

  function onComplete(callback) {
    $onComplete = callback;
  }


  return Object.freeze({
    getID,
    getTarget,
    setDuration,
    setEasing,
    setGoal,
    start,
    update,
    onComplete,
  });

}