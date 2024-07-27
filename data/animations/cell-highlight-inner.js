AnimationRegistry.register('cell-highlight-inner', {
  build: async (id,options) => {
    if (AnimationController.isPlaying(id)) { throw "A tile highlight is already playing." }

    const cell = options.hoverCell;

    const animation = ComplexAnimation(id);
    animation.setInitialState({ r:50, g:60, b:70, a:0.05 });
    animation.setTargetState({ r:50, g:100, b:75, a:0.1 });
    animation.onUpdate(p => {
      cell.setBackgroundColor(`rgba(${p.r},${p.g},${p.b},${p.a})`)
    })

    return animation;
  }
});
