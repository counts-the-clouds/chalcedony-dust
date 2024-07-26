
PlaygroundRegistry.register('pixi',{ init, run,
  show: "src/experimental/pixi/pixi.html",
});

function init() {}

let app;

async function run() {
  app = new PIXI.Application();
  await app.init({ background:'rgb(20,25,30)', resizeTo:window });
  X.first('#pixiCanvas').appendChild(app.canvas);

  testEase();
}

function testEase() {
  const container = new PIXI.Container();
  container.pivot.x = 250;
  container.pivot.y = 150;
  container.x = app.screen.width/2;
  container.y = app.screen.height/2;

  const square = new PIXI.Sprite(PIXI.Texture.WHITE);
  square.height = 300;
  square.width = 500;
  square.tint = 'rgb(50,60,70)'
  square.eventMode = 'static';
  square.onclick = () => { nudge(container) };

  container.addChild(square)

  app.stage.addChild(container);
}

function nudge(test) {
  let state = { angle: 20 };
  let options =  { duration: 100, ease:'easeInQuad' }

  const example = Ease.ease.add(test,state,options)
  example.once('complete', () => {
    let state = { angle: 0 };
    let options =  { duration: 100, ease:'easeOutQuad' }
    Ease.ease.add(test,state,options);
  })
}