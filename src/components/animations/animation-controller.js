global.AnimationController = (function () {

  let $animations = {};

  function isPlaying(id) {
    return $animations[id] != null;
  }

  function onTick(time) {
    Object.values($animations).forEach(animation => {
      animation.update(time);
    })
  }

  function onComplete(id) {
    delete $animations[id];
  }

  async function addAnimation(code, id, options={}) {
    const animationData = AnimationRegistry.lookup(code)
    const animation = await animationData.build(id, options);

    $animations[id] = animation;
    animation.start();
  }

  function stop(id) {
    if ($animations[id]) {
      if (typeof $animations[id].stop === 'function') {
        $animations[id].stop();
      }
      delete $animations[id];
    }
  }

  return Object.freeze({
    isPlaying,
    onTick,
    onComplete,
    addAnimation,
    stop,
  });

})();
