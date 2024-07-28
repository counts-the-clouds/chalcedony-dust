AnimationRegistry.register('cell-highlight-outer', {
  build: async (id,options) => {
    if (AnimationController.isPlaying(id)) { throw "A cell highlight is already playing." }

    const sprite = options.sprite;
    const TS = DungeonView.getTileSize();

    const animation = ComplexAnimation(id);
    animation.setInitialState({ alpha:0, shrink:(TS * 0.8) });
    animation.setTargetState({ alpha:1, shrink:0 });
    animation.setEasing(Easing.Quadratic.InOut);
    animation.setDuration(2000);

    const updateSprite = (properties) => {
      sprite.width = TS*3 - properties.shrink;
      sprite.height = TS*3 - properties.shrink;
      sprite.x = properties.shrink/2;
      sprite.y = properties.shrink/2;
      sprite.alpha = properties.alpha;
    }

    animation.onUpdate(updateSprite);
    animation.onComplete(updateSprite);

    return animation;
  }
});
