window.DragonDrop = (function() {

  let $dragContext;

  // The drag event is placed on the window so that we are guaranteed a mouse
  // out event if the cursor leaves the window. If the mouse is dragged off the
  // screen we stop the event, but we only attempt to place the tile on a mouse
  // up event.
  function init() {
    window.addEventListener('mouseup', () => { stopDrag(); });
    window.addEventListener('mouseout', () => { stopDrag('cancel'); });

    X.registerKeyAction("action.rotate-clockwise", isDragging, () => { rotateTile(1) });
    X.registerKeyAction("action.rotate-widdershins", isDragging, () => { rotateTile(-1) });
  }

  function isDragging() { return $dragContext != null; }
  function getContext() { return { ...$dragContext }; }

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

  function startDrag(context) {
    MouseMovement.stopDrag();
    $dragContext = context;
  }

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
        // console.log(`DragonDrop.onMove(${cellID})`);
        $dragContext.hoverCell = cellID;
        if (getHoverCell().getTile() == null) {
          PlacementManager.checkDropTarget();
        }
      }
    }
  }

  async function stopDrag(command) {
    if (!isDragging()) { return false; }

    if (command !== 'cancel') {
      await PlacementManager.placeTile();
    }

    TileShelfView.positionTiles();
    InnerCellHighlight.hide();
    $dragContext = null;
  }


  // === Rotate ================================================================

  function rotateTile(direction) {
    const tileContainer = $dragContext.tileContainer;
    const tile = tileContainer.getTile();

    if (!AnimationController.isPlaying(tileContainer.getID())) {
      if (isRotateAllowed(tile) === false) {
        return AnimationController.addAnimation('rotate-prevented', tileContainer.getID(), {
          target:tileContainer.getTileContainer(), direction });
      }

      (direction > 0) ? tile.rotateClockwise() : tile.rotateWiddershins();

      AnimationController.addAnimation('rotate-tile', tileContainer.getID(), {
        target:tileContainer.getTileContainer(), direction });

      PlacementManager.checkDropTarget();
    }
  }

  function isRotateAllowed(tile) {
    return ! (tile.getPlacementRules()||[]).includes(_noRotate);
  }

  return Object.freeze({
    init,
    isDragging,
    getContext,
    getDragTile,
    startDrag,
    stopDrag,
    onMove,
    getHoverCell,
    getHoverCoordinates,
  });

})();
