global.MouseMovement = (function() {

  let $dragContext;

  function isDragging() {
    return $dragContext != null;
  }

  function startDrag(event) {
    if (!DragonDrop.isDragging() && DungeonView.isMovementEnabled()) {
      $dragContext = {
        initialViewportLocation: DungeonViewport.getLocation(),
        origin: {
          x: event.global.x,
          y: event.global.y,
        },
      };
    }
  }

  function onMove(event) {
    if (isDragging()) {
      if (event.buttons === 0) { return stopDrag(); }

      const locationX = $dragContext.initialViewportLocation.x + event.global.x - $dragContext.origin.x;
      const locationY = $dragContext.initialViewportLocation.y + event.global.y - $dragContext.origin.y;
      DungeonViewport.setLocation(locationX, locationY);
    }
  }

  function stopDrag() {
    $dragContext = null;
  }

  return Object.freeze({
    isDragging,
    startDrag,
    onMove,
    stopDrag,
  });

})();
