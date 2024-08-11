AnimationRegistry.register('dom-fade-out', {
  build: (id,options) => {

    const animation = DomAnimation(id, options.element);
    animation.setInitialState({ opacity:1 });
    animation.setGoal({ opacity:0 });
    animation.setEasing(Easing.Quadratic.Out);
    animation.setDuration(options.duration);

    if (options.onComplete) {
      animation.onComplete(options.onComplete)
    }

    return animation;
  }
});
