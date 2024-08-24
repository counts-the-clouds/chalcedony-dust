global.DungeonViewport = (function() {

  const FAST = 50;
  const SLOW = 20;

  let $viewport;
  let $application;

  let $movementBindings;
  let $movementLimits;

  let $currentLocation = {x:0,y:0};
  let $currentScale = _defaultScale;
  let $speed = SLOW;

  function init() {
    window.addEventListener("wheel", event => {
      if (DungeonView.isVisible() && DungeonView.isMovementEnabled()) {
        const velocity = (Math.abs(event.deltaY) >= 100) ? 5 : 1;
        (event.deltaY < 0) ? zoomIn(velocity) : zoomOut(velocity);
      }
    });
  }

  function create(application) {
    $viewport = new Pixi.Container();
    $viewport.eventMode = 'static';
    $viewport.on('mousemove',DragonDrop.onMove);
    $viewport.on('mousedown', MouseMovement.startDrag);
    $viewport.on('mousemove',MouseMovement.onMove);
    $viewport.on('mouseup', MouseMovement.stopDrag);

    $application = application;
    $application.stage.addChild($viewport);
    $application.ticker.add(onTick);

    updateKeybindings();
    positionViewport();
    drawGuides();
  }

  // The keyboard bindings are saved as an array of actions, with each action
  // having an array of keycodes. This is a good structure for looking at and
  // modifying the keys associated with an action, but when looking up a
  // keybinding we want to traverse the mapping in the opposite direction,
  // checking to see if a key is bound to a movement action.
  //
  // If the key bindings are changed via the options in the escape menu while
  // the dungeon view is visible we'll need to call this again with the new
  // keybindings.
  function updateKeybindings() {
    $movementBindings = {};

    const addBindings = (action, codes) => {
      codes.forEach(code => { $movementBindings[code] = action; });
    }

    WorldState.getKeyBindings().forEach(binding => {
      ['up','down','left','right'].forEach(direction => {
        const action = `action.move-${direction}`;
        if (binding.action === action) { addBindings(action,binding.codes); }
      });
    });
  }

  function updateLimits() {
    const extent = DungeonView.getChunkExtent();
    const scaledTileSize = _tileSize * getScale();
    const scaledChunkSize = scaledTileSize * _chunkLength;

    let right =  scaledChunkSize;
    let left =   -scaledChunkSize + scaledTileSize;
    let top =    scaledChunkSize;
    let bottom = -scaledChunkSize + scaledTileSize;

    right -=  (extent.minx+1) * scaledChunkSize;
    left -=   (extent.maxx)   * scaledChunkSize;
    top -=    (extent.miny+1) * scaledChunkSize;
    bottom -= (extent.maxy)   * scaledChunkSize;

    $movementLimits = { top,bottom,left,right };
  }

  function addChild(child) {
    $viewport.addChild(child);
    updateLimits();
  }

  // === Application Events ====================================================

  function handleResize() {
    if ($viewport) {
      updateLimits();
      positionViewport();
    }
  }

  function onTick(time) {
    if ($viewport && DungeonView.isMovementEnabled() && !MouseMovement.isDragging()) {
      const keyState = KeyboardMonitor.getState();
      const isMoving = Object.keys($movementBindings).some(key => keyState.keys.includes(key));

      if (isMoving) {
        prepareMove(time, keyState);
        positionViewport();
      }
    }
  }

  function zoomIn(velocity) {
    if ($viewport && $currentScale > 0) {
      setScale($currentScale - velocity);
    }
  }

  function zoomOut(velocity) {
    if ($viewport && $currentScale < _scaleFactors.length - 1) {
      setScale($currentScale + velocity);
    }
  }

  // === Movement ==============================================================

  function getLocation() {
    return { ...$currentLocation };
  }

  function setLocation(x,y) {
    $currentLocation.x = x;
    $currentLocation.y = y;
    clampCurrentLocation();
    positionViewport();
  }

  function prepareMove(time, keyState) {
    $speed = keyState.modifiers.shift ? FAST : SLOW;

    const directions = new Set();
    keyState.keys.forEach(code => {
      if ($movementBindings[code]) {
        directions.add($movementBindings[code])
      }
    });

    // I'm sure there are better ways of removing opposing directions with a
    // union or something, but the stupid way I'm doing that below is going to
    // be a lot easier for me to understand next time I look at this.
    if (directions.has('action.move-up') && directions.has('action.move-down')) {
      directions.delete('action.move-up');
      directions.delete('action.move-down');
    }

    if (directions.has('action.move-left') && directions.has('action.move-right')) {
      directions.delete('action.move-left');
      directions.delete('action.move-right');
    }

    if (directions.size > 0) {
      executeMove(time,[...directions]);
    }
  }

  function executeMove(time,directions) {
    const distance = time.deltaTime * $speed;
    if (directions.includes('action.move-up'))    { $currentLocation.y += distance }
    if (directions.includes('action.move-down'))  { $currentLocation.y -= distance }
    if (directions.includes('action.move-left'))  { $currentLocation.x += distance }
    if (directions.includes('action.move-right')) { $currentLocation.x -= distance }
    clampCurrentLocation();
  }

  function clampCurrentLocation() {
    if ($currentLocation.y > $movementLimits.top)    { $currentLocation.y = $movementLimits.top; }
    if ($currentLocation.y < $movementLimits.bottom) { $currentLocation.y = $movementLimits.bottom; }
    if ($currentLocation.x < $movementLimits.left)   { $currentLocation.x = $movementLimits.left; }
    if ($currentLocation.x > $movementLimits.right)  { $currentLocation.x = $movementLimits.right; }
  }

  // === Guides ================================================================

  // When working on the viewport it's helpful to have the center of the
  // viewport under a crosshair. This center should be directly under the
  // $currentLocation
  function drawGuides() {
    if (false && Environment.isDevelopment) {
      const palette = ExtraRegistry.lookup('ColorPalette').viewport;
      const screen = DungeonView.getDimensions();
      const guides = new Pixi.Graphics();

      guides.clear();
      guides.rect((screen.width/2)-1,0,2,screen.height);
      guides.fill(palette.guides);
      guides.rect(0,(screen.height/2)-1,screen.width,2);
      guides.fill(palette.guides);

      $application.stage.addChild(guides);
    }
  }

  // === Positioning ===========================================================
  // The map scale, position, and tile visibility needs to be updated every
  // time the location is updated.

  function getCenterPoint() {
    const screen = DungeonView.getDimensions();
    const halfSize = (_tileSize * getScale()) / 2

    return {
      x: (screen.width / 2) - halfSize,
      y: (screen.height / 2) - halfSize,
    };
  }

  function getScale() {
    return _scaleFactors[$currentScale];
  }

  function setScale(scale) {
    const screen = DungeonView.getDimensions();
    const max = _scaleFactors.length - 1;

    const oldScale = getScale();
    const centerX = (screen.width / 2 - $viewport.x) / oldScale;
    const centerY = (screen.height / 2 - $viewport.y) / oldScale;

    if (scale < 0) { scale = 0; }
    if (scale > max) { scale = max; }
    $currentScale = scale;

    const newScale = getScale();
    $viewport.scale = newScale;
    $viewport.x = screen.width / 2 - centerX * newScale;
    $viewport.y = screen.height / 2 - centerY * newScale;

    const center = getCenterPoint();
    $currentLocation.x = $viewport.x - center.x;
    $currentLocation.y = $viewport.y - center.y;

    updateLimits();
    clampCurrentLocation();
  }

  function positionViewport() {
    const center = getCenterPoint();

    $viewport.scale = getScale();
    $viewport.x = center.x + $currentLocation.x;
    $viewport.y = center.y + $currentLocation.y;

    drawGuides();
    updateTileVisibility();
  }

  // === Culling ==============================================================

  // TODO: This will need to be redone.
  function updateTileVisibility() {
    // let scaleFactor = ScaleFactors[$currentScale];
    // let xTileCount = Math.ceil($application.screen.width / (TileSize * scaleFactor) / 2);
    // let yTileCount = Math.ceil($application.screen.height / (TileSize * scaleFactor) / 2);

    // let xMin = $location.x - xTileCount;
    // let xMax = $location.x + xTileCount;
    // let yMin = $location.y - yTileCount;
    // let yMax = $location.y + yTileCount;

    // $tileGraphics.forEach(tile => {
    //   let tileZ = tile.index.z + $tileSource.layerOffset

    //   tile.graphics.renderable = true

    //   if (tile.index.x < xMin) { tile.graphics.renderable = false; }
    //   if (tile.index.x > xMax) { tile.graphics.renderable = false; }
    //   if (tile.index.y < yMin) { tile.graphics.renderable = false; }
    //   if (tile.index.y > yMax) { tile.graphics.renderable = false; }
    //   if (tileZ != $location.z) { tile.graphics.renderable = false; }
    // });
  }

  return Object.freeze({
    init,
    create,
    handleResize,
    addChild,
    updateLimits,
    getLocation,
    setLocation,
    getScale,
  });

})();
