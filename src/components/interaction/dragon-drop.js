window.DragonDrop = (function() {

  let $dragContext;

  function init() {
    window.addEventListener('mouseup',stopDrag);
    window.addEventListener('mouseout',stopDrag);
  }

  function isDragging() {
    return $dragContext != null;
  }

  function startDrag(context) {
    const {event, tile, tileContainer} = context;


    tileContainer.cursor = 'grabbing';

    const offset = {
      x: event.global.x - tileContainer.x,
      y: event.global.y - tileContainer.y,
    }

    $dragContext = {
      offset,
      tile,
      tileContainer,
    }
  }

  function stopDrag() {
    if (!isDragging()) { return false; }

    TileShelfContainer.positionTiles();

    $dragContext.tileContainer.cursor = 'grab';
    $dragContext = null;
  }

  function onMove(event) {
    if (!isDragging()) { return false; }
    $dragContext.tileContainer.x = event.global.x - $dragContext.offset.x;
    $dragContext.tileContainer.y = event.global.y - $dragContext.offset.y;
  }

  return Object.freeze({
    init,
    isDragging,
    startDrag,
    stopDrag,
    onMove,
  });

})();
