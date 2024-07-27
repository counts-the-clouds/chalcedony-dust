AnimationRegistry.register('rotate-prevented', {
  build: async (id,options) => {
    if (AnimationController.isPlaying(id)) { throw "A rotation animation is already playing." }

    const animation = SequencedAnimation(id, options.target);
    animation.addKeyframe({ angle:options.direction * 20 },{ duration:100, easing:Easing.Quadratic.In });
    animation.addKeyframe({ angle:0 },{ duration:100, easing:Easing.Quadratic.Out });

    return animation;
  }
});
