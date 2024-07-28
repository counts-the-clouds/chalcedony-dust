AnimationRegistry.register('fade', {
  build: async (id,options) => {

    const animation = ResoluteAnimation(id, options.target);
    animation.setGoal({ alpha:1 });
    animation.setEasing(Easing.Quadratic.Out);
    animation.setDuration(options.duration);

    return animation;
  }
});
