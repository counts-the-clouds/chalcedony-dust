window.DragonDrop = (function() {

  let $dragContext;

  function isDragging() {
    return $dragContext != null;
  }

  function startDrag(context) {
    const {event, tile, tileContainer} = context;

    tileContainer.cursor = 'grabbing';

    const startingPosition = {
      x: tileContainer.x,
      y: tileContainer.y,
    }

    const offset = {
      x: event.global.x - tileContainer.x,
      y: event.global.y - tileContainer.y,
    }

    $dragContext = {
      startingPosition,
      offset,
      tile,
      tileContainer,
    }
  }

  function stopDrag() {
    if (!isDragging()) { return false; }

    $dragContext.tileContainer.cursor = 'grab';
    $dragContext.tileContainer.x = $dragContext.startingPosition.x;
    $dragContext.tileContainer.y = $dragContext.startingPosition.y;
    $dragContext = null;
  }

  function onMove(event) {
    if (!isDragging()) { return false; }
    $dragContext.tileContainer.x = event.global.x - $dragContext.offset.x;
    $dragContext.tileContainer.y = event.global.y - $dragContext.offset.y;
  }

  return Object.freeze({
    isDragging,
    startDrag,
    stopDrag,
    onMove,
  });

})();
