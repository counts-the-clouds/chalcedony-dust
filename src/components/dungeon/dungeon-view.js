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
    buildTileGrid();
  }

  function resize() { $application.resize(); }

  function getDimensions() {
    return {
      width: $application.screen.width,
      height: $application.screen.height,
    }
  }

  function buildTileGrid() {
    const chunks = DungeonGrid.getChunks();
    Object.keys(chunks).forEach(chunkID => {
      buildChunk(chunkID, chunks[chunkID]);
    });
  }

  // TODO: We need to set an extent as we add chunks so that we know how far
  //       we should be able to pan the view.
  //
  // TODO: We only need to include the text and chunk boundry box in
  //       development mode, or eventually just remove it completely.
  //
  function buildChunk(chunkID, chunk) {
    const chunkLocation = chunk.getChunkLocation();
    const chunkSize = _TS * 16;

    const graphics = new PIXI.Graphics();
    graphics.rect(0,-chunkSize,chunkSize,chunkSize);
    graphics.fill('rgba(50,25,0,0.1)');
    graphics.stroke({ color:'rgb(100,80,60,0.5)' });

    const text = new PIXI.Text({ text:`Chunk${chunkID}`, style: {
      fontFamily:'roboto',
      fontSize:200,
      fill:'rgba(150,140,130,0.15)',
    }});
    text.x = (chunkSize/2) - (text.width/2);
    text.y = -(chunkSize/2) - (text.height/2);

    const chunkContainer = new PIXI.Container();
    chunkContainer.addChild(graphics);
    chunkContainer.addChild(text);
    chunkContainer.x = chunkLocation.x * chunkSize;
    chunkContainer.y = -1 * chunkLocation.y * chunkSize;
    chunkContainer.y += _TS;

    DungeonViewport.addChild(chunkContainer);
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
    tile.y = _HS+(_TS*y) * -1;
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
