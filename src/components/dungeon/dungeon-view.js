global.DungeonView = (function() {

  let $application;

  function init() {}

  async function open() {
    await DungeonAssets.loadAssets();
    MainContent.setMainContent('views/dungeon-view.html');
    createApplication();
  }

  function close() {
    $application.destroy();
    $application = null;
  }

  async function createApplication() {
    $application = new PIXI.Application();
    await $application.init({
      antialias: true,
      resizeTo: window,
    });

    X.first("#dungeonCanvas").appendChild($application.canvas)
    DungeonViewport.create($application);
    await buildTileGrid();
  }

  function resize() { $application.resize(); }

  function getDimensions() {
    return {
      width: $application.screen.width,
      height: $application.screen.height,
    }
  }

  // TODO: Building Temp Tiles

  async function buildTileGrid() {
    for (let x=0; x<10; x++) {
      for (let y=0; y<10; y++) {
        await buildTile(x,y);
      }
    }
  }

  async function buildTile(x,y) {
    const background = new PIXI.Sprite(await DungeonAssets.randomTileBackground());
    background.x = _HS;
    background.y = _HS;
    background.pivot.x = _HS;
    background.pivot.y = _HS;
    background.angle = Random.upTo(4) * 90;

    const darkBox = new PIXI.Sprite(await PIXI.Assets.load('dark-box'));

    const text = new PIXI.Text({ text:`(${x},${y})`, style:{
      fontFamily:'roboto',
      align:'center',
      fontSize:20,
      fill:0xaa9988
    }});

    text.x = _HS - (text.width/2);
    text.y = _HS - (text.height/2);

    const tile = new PIXI.Container();
    tile.addChild(background);
    tile.addChild(darkBox);
    tile.addChild(text);
    tile.x = _HS+(_TS*x);
    tile.y = _HS+(_TS*y);
    tile.pivot.x = tile.width/2;
    tile.pivot.y = tile.height/2;

    DungeonViewport.addChild(tile);
  }

  return Object.freeze({
    init,
    open,
    resize,
    getDimensions,
  });

})();
