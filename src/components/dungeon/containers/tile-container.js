global.TileContainer = async function(tile) {

  const $tile = tile;
  const $tileContainer = new PIXI.Container();

  function getID() { return $tile.getID(); }
  function getTile() { return $tile; }
  function getTileContainer() { return $tileContainer; }

  async function buildContainer() {
    const layers = $tile.getLayers();
    const textures = await Promise.all(layers.map(async layer => {
      return await PIXI.Assets.load(layer.background);
    }));

    layers.forEach((layer,i) => {
      $tileContainer.addChild(new PIXI.Sprite(textures[i]));
    });

    $tileContainer.label = 'TileContainer';
    $tileContainer.accessibleHint = tile.getID();
    $tileContainer.eventMode = 'dynamic';
    $tileContainer.height = _tileSize;
    $tileContainer.width = _tileSize;
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

  function setOnShelf(isOnShelf) {

    // This is ugly from a code organization point of view, but we need to have
    // this function inside the setOnShelf() function for a couple reasons. We
    // need to send 'this' along to the DragonDrop context so that we don't
    // lose a handle onto this object. We also need to remove this function
    // as a listener when the drag is finished.
    const startDrag = event => {
      $tileContainer.cursor = 'grabbing'

      DragonDrop.setContext({
        tileContainer: this,
        offset:{
          x: event.global.x - $tileContainer.x,
          y: event.global.y - $tileContainer.y,
        }
      });

      PlacementManager.startDrag();
    }

    if (isOnShelf) {
      $tileContainer.cursor = 'grab'
      $tileContainer.on('mousemove',DragonDrop.onMove);
      $tileContainer.on('mouseup',DragonDrop.stopDrag);
      $tileContainer.on('mousedown',startDrag);
    }
    if (!isOnShelf) {
      tileContainer.cursor = 'pointer';
      $tileContainer.off('mousemove',DragonDrop.onMove);
      $tileContainer.off('mouseup',DragonDrop.stopDrag);
      $tileContainer.off('mousedown',startDrag);
    }
  }

  await buildContainer();

  return {
    getID,
    getTile,
    getTileContainer,
    setSize,
    setCursor,
    setPosition,
    setOnShelf,
  };
};


