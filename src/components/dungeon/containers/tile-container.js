global.TileContainer = async function(tile) {

  Validate.exists('Tile', tile);

  const $tile = tile;
  const $tileContainer = new Pixi.Container();
  const $background = new Pixi.Graphics;

  let $clockContainer;

  function getID() { return $tile.getID(); }
  function getTile() { return $tile; }
  function getTileContainer() { return $tileContainer; }

  async function buildContainer() {
    addBackground()

    $tileContainer.label = 'TileContainer';
    $tileContainer.accessibleHint = tile.getID();
    $tileContainer.height = _tileSize;
    $tileContainer.width = _tileSize;
    $tileContainer.pivot.x = _tileSize/2;
    $tileContainer.pivot.y = _tileSize/2;

    tile.getSegments().forEach(segment => {
      $tileContainer.addChild(TileLayer(segment).getShapeContainer());
    });
  }

  function addBackground() {
    const palette = ExtraRegistry.lookup('ColorPalette').tile;
    $background.rect(0,0,_tileSize,_tileSize);
    $background.fill(palette.background);

    $tileContainer.addChild($background);
  }

  function setSize(size) {
    $tileContainer.height = size;
    $tileContainer.width = size;
  }

  function setCursor(cursor) {
    $tileContainer.cursor = cursor;
  }

  function setPosition(x,y) {
    $tileContainer.x = x;
    $tileContainer.y = y;
  }

  // When we enable the clock we build a clock container and add it to this
  // tile container. Because the updateClock() function is called 60 times a
  // second, we also need to set the tile container on the clock in order to
  // make the lookup process as smooth as possible.
  async function enableClock(clock) {
    if ($clockContainer == null) {
      $clockContainer = await ClockContainer(clock);
      clock.setTileContainer(this);
      $tileContainer.addChild($clockContainer.getContainer());
    }
  }

  function disableClock() {
    $clockContainer.getContainer().destroy();
    $clockContainer = null;
  }

  async function updateClock(percent) {
    $clockContainer.updateClock(percent);
  }

  // Setting a tile on the shelf enables the drag and drop action on that tile.
  // This is ugly from a code organization point of view, but we need to have
  // the startDrag() function inside the setOnShelf() function for a couple
  // reasons. We need to send 'this' along to the DragonDrop context so that
  // we don't lose a handle onto this tile container. We also need to remove
  // the listeners when the drag is finished.
  function setOnShelf(isOnShelf) {

    const startDrag = event => {
      $tileContainer.cursor = 'grabbing'

      DragonDrop.startDrag({
        tileContainer: this,
        offset:{
          x: event.global.x - $tileContainer.x,
          y: event.global.y - $tileContainer.y,
        }
      });
    }

    if (isOnShelf) {
      $tileContainer.eventMode = 'dynamic';
      $tileContainer.cursor = 'grab'
      $tileContainer.on('mousemove',DragonDrop.onMove);
      $tileContainer.on('mouseup',DragonDrop.stopDrag);
      $tileContainer.on('mousedown',startDrag);
    }
    if (!isOnShelf) {
      $tileContainer.eventMode = 'none';
      tileContainer.cursor = 'pointer';
      $tileContainer.off('mousemove',DragonDrop.onMove);
      $tileContainer.off('mouseup',DragonDrop.stopDrag);
      $tileContainer.off('mousedown',startDrag);
    }
  }

  function segmentComplete(segment) {
    const index = segment.getIndex() + 1;
    const newLayer = TileLayer(segment).getShapeContainer();

    const shape = newLayer.getChildAt(0);
    const color = ColorHelper.hexValueToColors(shape.tint);

    $tileContainer.removeChildAt(index).destroy({ children:true });
    $tileContainer.addChildAt(newLayer, index);

    AnimationController.addAnimation('flash',`${segment}(Flash)`,{
      target: shape,
      r: color.r,
      g: color.g,
      b: color.b,
      duration:1000,
    });
  }

  await buildContainer();

  return {
    getID,
    getTile,
    getTileContainer,
    setSize,
    setCursor,
    setPosition,
    enableClock,
    disableClock,
    updateClock,
    setOnShelf,
    segmentComplete,
  };
};

TileContainer.forTile = function(tile) {
  const coords = tile.getCoordinates();
  const cellContainer = DungeonView.getCellContainerAt(coords.gx, coords.gy);
  return cellContainer ? cellContainer.getTileContainer() : null;
}
