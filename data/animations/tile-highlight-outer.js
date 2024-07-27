AnimationRegistry.register('tile-highlight-outer', {

  build: async (id,target,options) => {
    if (AnimationController.isPlaying(id)) { throw "A tile highlight is already playing." }

    const animation = ResoluteAnimation(id,target);

  }

});
