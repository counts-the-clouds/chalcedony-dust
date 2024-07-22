global.DungeonViewport = (function() {

  const TS = _tileSize;
  const HS = Math.floor(_tileSize/2);
  const FAST = 50;
  const SLOW = 20;

  const $scaleFactors = (SCALE_FACTORS[Environment.isMac ? 'MAC' : 'WIN']);

  let $viewport;
  let $guides;

  let $movementBindings;
  let $movementLimits;
  let $currentLocation = {x:0,y:0};

  let $scale = DEFAULT_SCALE[Environment.isMac ? 'MAC' : 'WIN'];
  let $speed = SLOW;

  function init() {

    window.addEventListener("resize", handleResize);
    window.addEventListener("wheel", event => {
      (event.deltaY < 0) ? zoomIn() : zoomOut();
    });
  }

  function create(application) {
    $viewport = new PIXI.Container();
    $guides = new PIXI.Graphics();
    $guides.alpha = 0.2;

    application.stage.addChild($viewport);
    application.stage.addChild($guides);
    application.ticker.add(onTick);

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
        if (binding.action == action) { addBindings(action,binding.codes); }
      });
    });
  }

  function updateLimits() {
    const extent = DungeonView.getChunkExtent();
    const scale = getScale();
    const tileSize = TS*scale
    const chunkSize = tileSize * _chunkSize;

    let right =  chunkSize;
    let left =   -chunkSize + tileSize;
    let top =    chunkSize;
    let bottom = -chunkSize + tileSize;

    right -=  (extent.minx+1) * chunkSize;
    left -=   (extent.maxx)   * chunkSize;
    top -=    (extent.miny+1) * chunkSize;
    bottom -= (extent.maxy)   * chunkSize;

    $movementLimits = { top,bottom,left,right };
  }

  function addChild(child) {
    $viewport.addChild(child);
  }

  // === Application Events ====================================================

  function handleResize() {
    if ($viewport) {
      DungeonView.resize();
      updateLimits();
      positionViewport();
    }
  }

  function onTick(time) {
    if ($viewport) {
      const keyState = KeyboardMonitor.getState();
      const isMoving = Object.keys($movementBindings).some(key => keyState.keys.includes(key));

      if (isMoving) {
        prepareMove(time, keyState);
        positionViewport();
      }
    }
  }

  // TODO: Zooming in and out simply adjusts the scale of the grid, but it
  //       should take the center point into account, and move the current
  //       location so that it remains in the center of the map.

  function zoomIn() {
    if ($viewport && $scale > 0) {
      $scale -= 1;
      updateLimits();
      clampCurrentLocation();
      positionViewport();
    }
  }

  function zoomOut() {
    if ($viewport && $scale < $scaleFactors.length-1) {
      $scale += 1;
      updateLimits();
      clampCurrentLocation();
      positionViewport();
    }
  }


  // === Movement ==============================================================

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

  function drawGuides() {
    const screen = DungeonView.getDimensions();

    if ($guides) {
      $guides.clear()
      $guides.rect((screen.width/2)-1,0,2,screen.height)
      $guides.fill(0xFF4030);
      $guides.rect(0,(screen.height/2)-1,screen.width,2);
      $guides.fill(0xFF4030);
    }
  }

  // === Positioning ===========================================================
  // The map scale, position, and tile visibility needs to be updated every
  // time the location is updated.

  function getScale() {
    return $scaleFactors[$scale];
  }

  function getCenterPoint() {
    const screen = DungeonView.getDimensions();
    const scale = getScale();

    return {
      x: (screen.width / 2) - (HS*scale),
      y: (screen.height / 2) - (HS*scale),
    };
  }

  function positionViewport() {
    const center = getCenterPoint();

    $viewport.scale = getScale();
    $viewport.x = center.x + $currentLocation.x;
    $viewport.y = center.y + $currentLocation.y;

    drawGuides();
    updateTileVisibility();
  }

  // TODO: This will need to be redone.
  function updateTileVisibility() {
    // let scaleFactor = ScaleFactors[$scale];
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
    addChild,
    updateLimits,
  });

})();
