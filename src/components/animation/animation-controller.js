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

  function addAnimation(code, options) {
    AnimationRegistry.lookup(code).build(options);
  }

  function start(id, animation) {
    $animations[id] = animation;
    animation.start();
  }

  return Object.freeze({
    isPlaying,
    onTick,
    onComplete,
    addAnimation,
    start,
  });

})();
