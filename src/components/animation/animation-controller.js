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

  async function addAnimation(code, id, target, options={}) {
    const animationData = AnimationRegistry.lookup(code)
    const animation = await animationData.build(id, target, options);

    $animations[id] = animation;
    animation.start();
  }

  return Object.freeze({
    isPlaying,
    onTick,
    onComplete,
    addAnimation,
  });

})();
