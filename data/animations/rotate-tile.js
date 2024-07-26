AnimationRegistry.register('rotate-tile', {
  // Keeping the actual tile rotation in sync with the animation is a
  // surprisingly complicated task. The tile should only know what direction
  // it's pointing in, so keeping the rotation angle in sync with the direction
  // without having the tile flip around like crazy is non trivial. Easier just
  // to forbid rotating while a rotation animation is already playing.
  build: (options) => {
    if (AnimationController.isPlaying(options.id)) { throw "A rotation animation is already playing." }

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

    AnimationController.start(options.id, animation);
  }
});
