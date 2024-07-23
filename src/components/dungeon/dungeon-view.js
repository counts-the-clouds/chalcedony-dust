global.DungeonView = (function() {

  let $application;
  let $chunkContainers = {}
  let $chunkExtent = { minx:0, miny:0, maxx:0, maxy:0 }

  function init() {
    DungeonViewport.init();
    TileShelfContainer.init();
    DragContainer.init();
  }

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
    TileShelfContainer.create($application);
    DragContainer.create($application);
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

      $chunkContainers[chunkID] = ChunkContainer(chunkID, chunks[chunkID]);
      DungeonViewport.addChild($chunkContainers[chunkID].container);
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

  return Object.freeze({
    init,
    open,
    resize,
    getChunkExtent,
    getDimensions,
  });

})();
