global.AnimationController = (function () {

  let $flicks = {};

  function addFlick(options) {
    const flick = Flick(options.code);
          flick.setAnimationID(options.id);
          flick.setAnimationTarget(options.target);

    // TODO: There might should be a way to cancel an animation, either
    //       returning the target object to the initial state or placing the
    //       target in the final state immediately. It would be bad if we start
    //       another animation before finishing the first. If that happens we
    //       could instantly finish the first animation or append the new
    //       animation's keyframes to the currently playing animation.

    if ($flicks[options.id]) {
      removeFlick(options.id);
      throw 'Need to handle multiple animations on the same object.'
    }

    $flicks[options.id] = flick;
  }

  function removeFlick(id) {
    delete $flicks[id];
  }

  function onTick(time) {
    Object.keys($flicks).forEach(id => {
      console.log(`Update Flick(${id})`,time.deltaTime);
    });
  }

  return Object.freeze({
    addFlick,
    onTick,
  });

})();
