window.DragonDrop = (function() {

  let $dragContext;

  // The drag event is placed on the window so that we are guaranteed a mouse
  // out event if the cursor leaves the window. If the mouse is dragged off the
  // screen we stop the event, but we only attempt to place the tile on a mouse
  // up event.
  function init() {
    window.addEventListener('mouseup', event => { stopDrag(true); });
    window.addEventListener('mouseout', event => { stopDrag(false); });
  }

  function isDragging() { return $dragContext != null; }
  function getContext() { return { ...$dragContext }; }
  function setContext(context) { $dragContext = context; }

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

  function onMove(event) {
    if (!isDragging()) { return false; }

    $dragContext.tileContainer.setPosition(
      (event.global.x - $dragContext.offset.x),
      (event.global.y - $dragContext.offset.y));

    const x = event.global.x - $dragContext.offset.x + (_tileSize/4);
    const y = event.global.y - $dragContext.offset.y + (_tileSize/4);

    const cellContainer = DungeonView.getCellContainerAtPoint(x,y);
    if (cellContainer) {
      let cellID = cellContainer.getID();
      if ($dragContext.hoverCell !== cellID) {
        $dragContext.hoverCell = cellID;
        PlacementManager.checkDropTarget();
      }
    }
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

  return Object.freeze({
    init,
    isDragging,
    getContext,
    setContext,
    stopDrag,
    onMove,
    getHoverCell,
    getHoverCoordinates,
  });

})();
