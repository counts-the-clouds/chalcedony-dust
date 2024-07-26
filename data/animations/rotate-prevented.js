AnimationRegistry.register('rotate-prevented', {

  build: (options) => {
    if (AnimationController.isPlaying(options.id)) { throw "A rotation animation is already playing." }

    const animation = SequencedAnimation(options.id, options.target);
    animation.addKeyframe({ angle:options.direction * 20 },{ duration:100, easing:Easing.Quadratic.In });
    animation.addKeyframe({ angle:0 },{ duration:100, easing:Easing.Quadratic.Out });

    AnimationController.start(options.id, animation);
  }

});