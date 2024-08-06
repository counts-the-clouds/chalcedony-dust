AnimationRegistry.register('flash', {
  build: async (id,options) => {

    const animation = ResoluteAnimation(id, options.target);
    animation.setGoal({ r:options.r, g:options.g, b:options.b });
    animation.setInitialState({ r:255, g:255, b:255 });
    animation.setEasing(Easing.Quadratic.Out);
    animation.setDuration(options.duration);

    return animation;
  }
});
