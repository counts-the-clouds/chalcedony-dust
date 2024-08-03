global.DungeonView = (function() {

  let $application;
  let $effectsContainer;
  let $chunkContainers = {}
  let $chunkExtent = { minx:0, miny:0, maxx:0, maxy:0 }

  function init() {
    DragonDrop.init();
    DungeonViewport.init();
    TileShelfView.init();
    ClockManager.init();
  }

  function reset() {
    log('Reset',{ level:1, system:'DungeonView' });

    Object.values($chunkContainers).forEach(chunk => {
      chunk.destroy();
    });

    $chunkContainers = {};
    $chunkExtent = { minx:0, miny:0, maxx:0, maxy:0 };

    ClockManager.reset();
    createTileGrid();
  }

  async function open() {
    await DungeonAssets.loadAssets();
    MainContent.setMainContent('views/dungeon-view.html');
    await createApplication();


    // const tileClock = Clock({ id:'generate-tile' });
    // tileClock.attachCell
    // ClockManager.addClock(tileClock);
  }

  function isVisible() {
    return X.first('#dungeonView') != null;
  }

  function close() {
    $application.destroy();
    $application = null;
  }

  async function createApplication() {
    $application = new Pixi.Application();
    await $application.init({
      antialias: true,
      resizeTo: window,
    });

    $application.ticker.add(AnimationController.onTick);
    $application.ticker.add(ClockManager.onTick);

    X.first("#dungeonCanvas").appendChild($application.canvas)

    DungeonViewport.create($application);
    await createEffectsContainer();
    await TileShelfView.create($application);
    createTileGrid();
  }

  async function createEffectsContainer() {
    $effectsContainer = new Pixi.Container();
    $effectsContainer.x = 0;
    $effectsContainer.y = 0;
    $effectsContainer.width = $application.screen.width
    $effectsContainer.height = $application.screen.height
    $effectsContainer.addChild(await OuterCellHighlight.build());
    $effectsContainer.addChild(await InnerCellHighlight.build());

    $application.stage.addChild($effectsContainer);
  }

  function createTileGrid() {
    ChunkDataStore.all().forEach(chunk => {
      const id = chunk.getID();
      const location = chunk.getChunkLocation();

      if ($chunkExtent.minx > location.x) { $chunkExtent.minx = location.x }
      if ($chunkExtent.maxx < location.x) { $chunkExtent.maxx = location.x }
      if ($chunkExtent.miny > location.y) { $chunkExtent.miny = location.y }
      if ($chunkExtent.maxy < location.y) { $chunkExtent.maxy = location.y }

      $chunkContainers[id] = ChunkContainer(id);
      DungeonViewport.addChild($chunkContainers[id].getChunkContainer());
    });

    DungeonViewport.updateLimits();
    TileShelfView.refresh();
  }

  function resize() { $application.resize(); }

  function getChunkExtent() { return $chunkExtent }

  function getTileSize() { return _tileSize * DungeonViewport.getScale(); }

  function getDimensions() {
    return {
      width: $application.screen.width,
      height: $application.screen.height,
    }
  }

  // Normally the movement is disabled by when dragging tiles, during events,
  // or when other dialogs are open. Movement can also be disabled with a game
  // flag in the case of the tutorial game.
  function isMovementEnabled() {
    if (GameFlags.has('dungeon-view.disable-movement')) { return false; }
    if (DragonDrop.isDragging()) { return false; }
    if (EventView.isVisible()) { return false; }
    return true;
  }

  // ===========================================================================

  // Get the tile given a global coordinate.
  function getTileAt(x,y) {
    const cellContainer = getCellContainerAt(x,y)
    return cellContainer ? cellContainer.getTile() : null;
  }

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
    reset,
    open,
    isVisible,
    close,
    getTileSize,
    resize,
    getChunkExtent,
    getDimensions,
    isMovementEnabled,
    getTileAt,
    getCellContainerAt,
    getCellContainerAtPoint,
    placeTile,
  });

})();
