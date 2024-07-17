
PlaygroundRegistry.register('pixi',{ init, run,
  show: "src/experimental/pixi/pixi.html",
});

function init() {}

async function run() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const application = new PIXI.Application();
  await application.init({ width, height });

  X.first('#pixiCanvas').appendChild(application.canvas);

  await PIXI.Assets.load(`${APP}/assets/icon.png`);
  let sprite = PIXI.Sprite.from(`${APP}/assets/icon.png`);

  application.stage.addChild(sprite);

  let elapsed = 0.0;
  application.ticker.add((ticker) => {

    // DeltaTime is "scalar" time, which I think depends on the FPS or something?
    // elapsed += ticker.deltaTime;

    // elapsedMS is actual time
    elapsed += ticker.elapsedMS;
    // console.log(Math.floor(elapsed/1000),' > ',ticker.elapsedMS);

  });

}
