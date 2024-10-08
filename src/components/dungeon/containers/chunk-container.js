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
  function getChunk() { return ChunkDataStore.get($chunkID) }
  function getChunkContainer() { return $chunkContainer; }
  function getCellContainer(index) { return $cellContainers[index]; }

  // === Building ==============================================================

  function destroy() {
    $chunkContainer.destroy({ children:true });
  }

  function buildDevelopmentGuides() {
    if (false && Environment.isDevelopment) {
      const palette = ExtraRegistry.lookup('ColorPalette').chunk;
      const border = new Pixi.Graphics();
      border.rect(0,0,_chunkSize,_chunkSize);
      border.stroke({ width:3, color:palette.guides.stroke });

      const text = new Pixi.Text({ text:`Chunk${$chunkID}`, style: {
        fontFamily:'roboto',
        fontSize:200,
        fill:palette.guides.text,
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

    getChunk().getCells().forEach((tileID,i) => {
      const coordinates = Coordinates.fromChunk($location.x, $location.y, i);
      const cellContainer = CellContainer(x,y,coordinates);

      if (tileID !== 0) {
        cellContainer.setTile(TileDataStore.get(tileID));
      }

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
    const tileSize = DungeonView.getTileSize();
    const position = $chunkContainer.getGlobalPosition();
    const row = Math.floor((y-position.y) / tileSize);
    const col = Math.floor((x-position.x) / tileSize);

    return getCellContainer((row * _chunkLength) + col);
  }

  return Object.freeze({
    destroy,
    getChunkID,
    getChunk,
    getChunkContainer,
    getCellContainer,
    getCellContainerAtPoint,
  });
}
