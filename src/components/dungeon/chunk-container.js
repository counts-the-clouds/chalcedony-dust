global.ChunkContainer = function(chunkID, chunk) {

  const $chunkID = chunkID;
  const $chunk = chunk;
  const $location = $chunk.getChunkLocation();
  const $cellContainers = [];

  const chunkSize = _tileSize * 16;

  const $container = new PIXI.Container();
        $container.x = $location.x * chunkSize;
        $container.y = $location.y * chunkSize;

  addGuides();
  addCells()


  function addGuides() {
    if (Environment.isDevelopment) {
      const graphics = new PIXI.Graphics();
      graphics.rect(0,0,chunkSize,chunkSize);
      graphics.stroke({ width:3, color:'rgb(100,80,60,0.5)' });

      const text = new PIXI.Text({ text:`Chunk${$chunkID}`, style: {
        fontFamily:'roboto',
        fontSize:200,
        fill:'rgba(150,140,130,0.15)',
      }});
      text.x = (chunkSize/2) - (text.width/2);
      text.y = (chunkSize/2) - (text.height/2);

      $container.addChild(graphics);
      $container.addChild(text);
    }
  }


  async function addCells() {
    const backgrounds = await Promise.all(Array.from({ length:16*16 }, async () => {
      return await DungeonAssets.randomTileBackground();
    }));

    buildCellContainers({
      darkBox: await PIXI.Assets.load('dark-box'),
      backgrounds,
    });
  }

  function buildCellContainers(assets) {
    let x = 0;
    let y = 0;

    chunk.getCells().forEach((tile,i) => {

      const cell = CellContainer(x, y, tile, {
        coordinates: Coordinates.fromChunk($location.x,$location.y,i),
        background: new PIXI.Sprite(assets.backgrounds[i]),
        darkBox: new PIXI.Sprite(assets.darkBox),
      });

      $container.addChild(cell);
      $cellContainers.push(cell);

      x += 1;
      if (x == _chunkSize) {
        x = 0;
        y += 1;
      }
    });
  }

  return Object.freeze({
    chunkID: $chunkID,
    chunk: $chunk,
    container: $container,
  });
}
