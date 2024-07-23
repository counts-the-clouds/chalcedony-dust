global.EffectsContainer = (function () {

  async function create(application) {
    const effectsArea = new PIXI.Container();
    effectsArea.x = 0;
    effectsArea.y = 0;
    effectsArea.width = application.screen.width
    effectsArea.height = application.screen.height
    effectsArea.addChild(await TileHighlight.build());

    application.stage.addChild(effectsArea);
  }

  return Object.freeze({
    create
  });

})();
