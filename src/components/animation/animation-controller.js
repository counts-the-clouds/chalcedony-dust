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

  function rotatePrevented(options) {
    if ($animations[options.id]) { throw "A rotation animation is already playing." }

    const animation = SequencedAnimation(options.id, options.target);
    animation.addKeyframe({ angle:options.direction * 20 },{ duration:100, easing:Easing.Quadratic.In });
    animation.addKeyframe({ angle:0 },{ duration:100, easing:Easing.Quadratic.Out });

    $animations[options.id] = animation;

    animation.start();
  }

  // Keeping the actual tile rotation in sync with the animation is a
  // surprisingly complicated task. The tile should only know what direction
  // it's pointing in, so keeping the rotation angle in sync with the direction
  // without having the tile flip around like crazy is non trivial. Easier just
  // to forbid rotating while a rotation animation is already playing.
  function rotateTile(options) {
    if ($animations[options.id]) { throw "A rotation animation is already playing." }

    let angle = options.target.angle;
    if (options.direction < 0) { angle -= 90; }
    if (options.direction > 0) { angle += 90; }

    const animation = ResoluteAnimation(options.id, options.target);
    animation.setDuration(200);
    animation.setEasing(Easing.Quadratic.InOut);
    animation.setGoal({ angle });

    animation.onComplete(() => {
      if (Math.abs(angle) % 360 === 0) {
        options.target.angle = 0;
      }
    });

    $animations[options.id] = animation;

    animation.start();
  }

  return Object.freeze({
    isPlaying,
    onTick,
    onComplete,
    rotatePrevented,
    rotateTile,
  });

})();
