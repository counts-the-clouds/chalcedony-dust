global.DungeonView = (function() {

  let $application;
  let $chunkContainers = {}
  let $chunkExtent = { minx:0, miny:0, maxx:0, maxy:0 }

  function init() {
    DragonDrop.init();
    DungeonViewport.init();
    TileShelfContainer.init();
  }

  async function open() {
    await DungeonAssets.loadAssets();
    MainContent.setMainContent('views/dungeon-view.html');
    await createApplication();
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
    await EffectsContainer.create($application);
    await TileShelfContainer.create($application);
    createTileGrid();
  }

  function createTileGrid() {
    const chunks = DungeonGrid.getChunks();
    Object.keys(chunks).forEach(chunkID => {

      let location = chunks[chunkID].getChunkLocation();
      if ($chunkExtent.minx > location.x) { $chunkExtent.minx = location.x }
      if ($chunkExtent.maxx < location.x) { $chunkExtent.maxx = location.x }
      if ($chunkExtent.miny > location.y) { $chunkExtent.miny = location.y }
      if ($chunkExtent.maxy < location.y) { $chunkExtent.maxy = location.y }

      $chunkContainers[chunkID] = ChunkContainer(chunkID);
      DungeonViewport.addChild($chunkContainers[chunkID].getChunkContainer());
    });

    DungeonViewport.updateLimits();
    TileShelfContainer.refresh();
  }

  function resize() { $application.resize(); }

  function getChunkExtent() { return $chunkExtent }

  function getDimensions() {
    return {
      width: $application.screen.width,
      height: $application.screen.height,
    }
  }

  // ===========================================================================

  // Get the cell container given a tile's global coordinates.
  function getCellContainerAt(x,y) {
    const coordinates = Coordinates.fromGlobal(x,y);
    const chunk = $chunkContainers[coordinates.chunkID];
    return chunk ? chunk.getCellContainer(coordinates.ci) : null;
  }

  // Getting the container by the actual point is a huge expensive pain in the
  // ass that needs to be called on mouse move, so this needs to be as
  // efficient as possible. We loop through the chunks to find one with the
  // point within its bounds. This isn't too expensive, there should never be
  // that many of them. With a chunk and an offset within that chunk we can
  // calculate which cell should be at that position.
  function getCellContainerAtPoint(x,y) {
    const chunkContainer = getChunkContainerAtPoint(x,y);
    return chunkContainer ? chunkContainer.getCellContainerAtPoint(x,y) : null;
  }

  function getChunkContainerAtPoint(x,y) {
      const chunkIDs = Object.keys($chunkContainers);
      const chunkSize = DungeonViewport.getScale() * _chunkSize;

      for (let i=0; i<chunkIDs.length; i++) {
        const chunkContainer = $chunkContainers[chunkIDs[i]];
        const position = chunkContainer.getChunkContainer().getGlobalPosition();
        if ((x > position.x) && (x < position.x + chunkSize) && (y > position.y) && (y < position.y + chunkSize)) {
          return chunkContainer;
        }
      }

      return null;
  }

  // ===========================================================================

  function placeTile(tile) {
    const coordinates = tile.getCoordinates();
    getCellContainerAt(coordinates.gx,coordinates.gy).setTile(tile);
  }

  return Object.freeze({
    init,
    open,
    close,
    resize,
    getChunkExtent,
    getDimensions,
    getCellContainerAt,
    getCellContainerAtPoint,
    placeTile,
  });

})();
