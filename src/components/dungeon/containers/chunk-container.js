global.ChunkContainer = function(chunkID) {

  const $chunkID = chunkID;
  const $chunkContainer = new Pixi.Container();
  const $cellContainers = [];
  const $location = getChunk().getChunkLocation();

  $chunkContainer.label = "ChunkContainer";
  $chunkContainer.accessibleHint = chunkID;
  $chunkContainer.x = $location.x * _chunkSize;
  $chunkContainer.y = $location.y * _chunkSize;

  buildDevelopmentGuides();
  buildCellContainers();

  function getChunkID() { return $chunkID; }
  function getChunk() { return DungeonGrid.getChunk($chunkID) }
  function getChunkContainer() { return $chunkContainer; }
  function getCellContainer(index) { return $cellContainers[index]; }

  // === Building ==============================================================

  function buildDevelopmentGuides() {
    if (Environment.isDevelopment) {
      const border = new Pixi.Graphics();
      border.rect(0,0,_chunkSize,_chunkSize);
      border.stroke({ width:3, color:'rgb(100,80,60,0.4)' });

      const text = new Pixi.Text({ text:`Chunk${$chunkID}`, style: {
        fontFamily:'roboto',
        fontSize:200,
        fill:'rgba(150,140,130,0.4)',
      }});
      text.x = (_chunkSize/2) - (text.width/2);
      text.y = (_chunkSize/2) - (text.height/2);

      $chunkContainer.addChild(border);
      $chunkContainer.addChild(text);
    }
  }

  function buildCellContainers() {
    let x = 0;
    let y = 0;

    getChunk().getCells().forEach((tile,i) => {
      const coordinates = Coordinates.fromChunk($location.x, $location.y, i);
      const cellContainer = CellContainer(x,y,coordinates);

      $chunkContainer.addChild(cellContainer.getCellContainer());
      $cellContainers.push(cellContainer);

      x += 1;
      if (x === _chunkLength) {
        x = 0;
        y += 1;
      }

    });
  }

  // ===========================================================================

  // Get the cell container at the specified Pixi global point by determining
  // which cell should be at that location.
  function getCellContainerAtPoint(x,y) {
    const tileSize = DungeonViewport.getScale() * _tileSize;
    const position = $chunkContainer.getGlobalPosition();
    const row = Math.floor((y-position.y) / tileSize);
    const col = Math.floor((x-position.x) / tileSize);

    return getCellContainer((row * _chunkLength) + col);
  }

  return Object.freeze({
    getChunkID,
    getChunk,
    getChunkContainer,
    getCellContainer,
    getCellContainerAtPoint,
  });
}
