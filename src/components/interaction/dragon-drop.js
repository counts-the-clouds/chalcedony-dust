window.DragonDrop = (function() {

  let $dragContext;

  function init() {
    window.addEventListener('mouseup',stopDrag);
    window.addEventListener('mouseout',stopDrag);
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
    getContext,
    startDrag,
    stopDrag,
    onMove,
  });

})();
