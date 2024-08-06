global.ResoluteAnimation = function(id, target) {

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
  function setInitialState(state) { $initialState = state; }
  function setStateValue(key,value) { $initialState[key] = value; }

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

    // If we're setting a tint as a goal the Pixi object isn't going to have
    // the RGB channels properly divided. Call setInitialState() or
    // setStateValue() to add the initial RGB values before starting the
    // animation.
    Object.keys(goal).forEach(key => {
      if (!['r','g','b'].includes(key)) {
        $initialState[key] = $target[key];
      }
    });
  }

  function start() {
    $tween = new Tween($initialState)
    $tween.to($goal,$duration);
    $tween.easing($easing);
    $tween.start();

    $tween.onUpdate(properties => {
      const keys = Object.keys(properties);

      // When animating a tint we need to divide the color into individual
      // channels, tween them separately, then combine them back together on
      // update. We remove them from the keys so they're not set below.
      if (keys.includes('r') && keys.includes('g') && keys.includes('b')) {
        ArrayHelper.remove(keys,'r');
        ArrayHelper.remove(keys,'g');
        ArrayHelper.remove(keys,'b');
        $target.tint = `rgb(${properties.r},${properties.g},${properties.b})`;
      }

      keys.forEach(key => {
        $target[key] = properties[key];
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
    getTarget,
    setDuration,
    setEasing,
    setInitialState,
    setStateValue,
    setGoal,
    start,
    update,
    onComplete,
  });

}