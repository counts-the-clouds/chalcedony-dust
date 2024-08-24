global.DungeonView = (function() {

  let $application;
  let $minionWindow;
  let $inventoryWindow;

  let $effectsContainer;
  let $chunkContainers = {}
  let $chunkExtent = { minx:0, miny:0, maxx:0, maxy:0 }
  let $isResizing = false;

  function init() {
    window.addEventListener("resize", resize);

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
    TileShelfView.refresh();
  }

  async function open() {
    MainContent.setMainContent('views/dungeon-view.html');

    await createApplication();
    await TileShelfView.refresh();

    if (GameFlags.has(SystemFlags.hideSpeedControl)) {
      SpeedControl.hide();
    }

    $minionWindow = SlideWindow({ selector:'#minionsWindow' });
    $inventoryWindow = SlideWindow({ selector:'#inventoryWindow' });

    resize();
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
    $effectsContainer.addChild(await InnerCellHighlight.build());

    $application.stage.addChild($effectsContainer);
  }

  function createTileGrid() {
    ChunkDataStore.all().forEach(chunk => {
      addChunk(chunk);
    });
  }

  function addChunk(chunk) {
    const id = chunk.getID();
    const location = chunk.getChunkLocation();

    if ($chunkExtent.minx > location.x) { $chunkExtent.minx = location.x }
    if ($chunkExtent.maxx < location.x) { $chunkExtent.maxx = location.x }
    if ($chunkExtent.miny > location.y) { $chunkExtent.miny = location.y }
    if ($chunkExtent.maxy < location.y) { $chunkExtent.maxy = location.y }

    $chunkContainers[id] = ChunkContainer(id);
    DungeonViewport.addChild($chunkContainers[id].getChunkContainer());
  }

  function resize(event) {
    if (isVisible()) {
      const screen = getDimensions();
      const shelfWidth = TileShelfView.getWidth();
      const panelWidth = (screen.width - shelfWidth) / 2;

      X.first('#lowerBar #tileShelfArea').style.width = `${shelfWidth}px`;
      X.first('#lowerBar #leftPanel').style.width = `${panelWidth}px`;
      X.first('#lowerBar #rightPanel').style.width = `${panelWidth}px`;

      $application.resize();
      $minionWindow.reposition();
      $inventoryWindow.reposition();
      DungeonViewport.handleResize();
      TileShelfView.handleResize();

      if (event && $isResizing === false) {
        console.log(">>> Arm Hack")
        window.addEventListener('mousemove', resizeHack);
        $isResizing = true;
      }

      if (event == null) {
        console.log("--- Resize Without Event")
      }
    }
  }

  // I think there's a bug in chromium on Mac that when a window is maximized
  // it plays an animation showing the window getting bigger before entering
  // into the maximized state. This results in resize() getting fired a couple
  // times as the window gets bigger, but doesn't fire a final time when the
  // window is at its maximum size. This results in an incorrect size being
  // received on the final resize event. To combat this I arm a mousemove
  // listener while we're resizing the window. This shouldn't be caught by the
  // window while it's being resized as those event happen outside the window
  // boundary. When the mouse is moved over the window again we remove the
  // listener and after a short delay call resize() to make sure that we're
  // resizing to the correct dimensions once the window has stopped being
  // resized and we can assume it's in a stable state.
  //
  // TODO: Verify that this works the same way on Windows, or isn't actually
  //       needed there.
  //
  function resizeHack() {
    console.log("<<< Disarm Hack")
    window.setTimeout(resize,100);
    window.removeEventListener('mousemove', resizeHack);
    $isResizing = false;
  }

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
    if (GameFlags.has(SystemFlags.disableMovement)) { return false; }
    if (DragonDrop.isDragging()) { return false; }
    if (EventView.isVisible()) { return false; }
    if (MainMenu.isVisible()) { return false; }
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
    addChunk,
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
