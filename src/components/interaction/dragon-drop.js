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

  function startDrag(context) {
    context.tileContainer.cursor = 'grabbing';

    $dragContext = {
      tile: context.tile,
      tileContainer: context.tileContainer,
      offset: {
        x: context.event.global.x - context.tileContainer.x,
        y: context.event.global.y - context.tileContainer.y,
      },
    }
  }

  function stopDrag(placeTile) {
    if (!isDragging()) { return false; }

    if (placeTile) {
      PlacementManager.placeTile(getContext());
    }

    TileShelfContainer.positionTiles();
    TileHighlight.hide();

    $dragContext.tileContainer.cursor = 'grab';
    $dragContext = null;
  }

  function onMove(event) {
    if (!isDragging()) { return false; }
    $dragContext.tileContainer.x = event.global.x - $dragContext.offset.x;
    $dragContext.tileContainer.y = event.global.y - $dragContext.offset.y;

    const x = event.global.x - $dragContext.offset.x + (_tileSize/4);
    const y = event.global.y - $dragContext.offset.y + (_tileSize/4);

    const cellContainer = DungeonView.getCellContainerAtPoint(x,y);
    if (cellContainer) {
      let cellPosition = cellContainer.accessibleHint;
      if ($dragContext.hoverCell !== cellPosition) {
        console.log(` -> ${cellPosition}`)
        $dragContext.hoverCell = cellPosition;
      }
    }
  }

  return Object.freeze({
    init,
    isDragging,
    getContext,
    startDrag,
    stopDrag,
    onMove,
  });

})();
