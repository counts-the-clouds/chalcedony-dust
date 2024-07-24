
PlaygroundRegistry.register('pixi',{ init, run,
  show: "src/experimental/pixi/pixi.html",
});

function init() {}

async function run() {
  const app = new PIXI.Application();
  await app.init({ background:'#131320', resizeTo:window });

  X.first('#pixiCanvas').appendChild(app.canvas);




}
