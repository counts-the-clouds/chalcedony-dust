window.DragonDrop = (function() {

  let $dragContext;

  // The drag event is placed on the window so that we are guaranteed a mouse
  // out event if the cursor leaves the window. If the mouse is dragged off the
  // screen we stop the event, but we only attempt to place the tile on a mouse
  // up event.
  function init() {
    window.addEventListener('mouseup', event => { stopDrag(true); });
    window.addEventListener('mouseout', event => { stopDrag(false); });

    X.registerKeyAction("action.rotate-clockwise", isDragging, rotateClockwise);
    X.registerKeyAction("action.rotate-widdershins", isDragging, rotateWiddershins);
  }

  function isDragging() { return $dragContext != null; }
  function getContext() { return { ...$dragContext }; }
  function setContext(context) { $dragContext = context; }

  function getDragTile() {
    return $dragContext ? $dragContext.tileContainer.getTile() : null;
  }

  function getHoverCoordinates() {
    if ($dragContext.hoverCell == null) { return null; }
    const [gx,gy] = $dragContext.hoverCell.split(':');
    return Coordinates.fromGlobal(parseInt(gx),parseInt(gy));
  }

  function getHoverCell() {
    if ($dragContext.hoverCell == null) { return null; }
    const coordinates = getHoverCoordinates();
    return DungeonView.getCellContainerAt(coordinates.gx,coordinates.gy);
  }

  // === Drag & Drop ===========================================================

  function onMove(event) {
    if (!isDragging()) { return false; }

    $dragContext.tileContainer.setPosition(
      (event.global.x - $dragContext.offset.x),
      (event.global.y - $dragContext.offset.y));

    const x = event.global.x - $dragContext.offset.x;
    const y = event.global.y - $dragContext.offset.y;

    const cellContainer = DungeonView.getCellContainerAtPoint(x,y);
    if (cellContainer) {
      let cellID = cellContainer.getID();
      if ($dragContext.hoverCell !== cellID) {
        // console.log(`Over(${cellID})`)
        $dragContext.hoverCell = cellID;
        PlacementManager.checkDropTarget();
      }
    }
  }

  function stopDrag(placeTile) {
    if (!isDragging()) { return false; }

    if (placeTile) {
      PlacementManager.placeTile();
    }

    TileShelfView.positionTiles();
    TileHighlight.hide();

    $dragContext.tileContainer.setCursor('grab');
    $dragContext = null;
  }

  // === Rotate ================================================================

  function rotateClockwise() {
    const tileContainer = $dragContext.tileContainer;
    const tile = tileContainer.getTile();

    if (isRotateAllowed(tile) === false) {
      AnimationController.addFlick({
        id: tileContainer.getID(),
        code: 'no-rotation-clockwise',
        target: tileContainer.getTileContainer()
      });
    }
  }

  function rotateWiddershins() {
    const tileContainer = $dragContext.tileContainer;
    const tile = tileContainer.getTile();

    if (isRotateAllowed(tile) === false) {
      AnimationController.addFlick({
        id: tileContainer.getID(),
        code: 'no-rotation-widdershins',
        target: tileContainer.getTileContainer()
      });
    }
  }

  function isRotateAllowed(tile) {
    return ! (tile.getPlacementRules()||[]).includes(_noRotate);
  }


  return Object.freeze({
    init,
    isDragging,
    getContext,
    setContext,
    getDragTile,
    stopDrag,
    onMove,
    getHoverCell,
    getHoverCoordinates,
  });

})();
