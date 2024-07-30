global.TileContainer = async function(tile) {

  const $tile = tile;
  const $tileContainer = new Pixi.Container();

  function getID() { return $tile.getID(); }
  function getTile() { return $tile; }
  function getTileContainer() { return $tileContainer; }

  async function buildContainer() {
    const layers = $tile.getLayers();
    const textures = await Promise.all(layers.map(async layer => {
      return await Pixi.Assets.load(layer.background);
    }));

    const background = new Pixi.Graphics;
    background.rect(0,0,_tileSize,_tileSize);
    background.fill('rgb(20,20,20)');

    $tileContainer.addChild(background);

    layers.forEach((layer,i) => {
      const sprite = new Pixi.Sprite(textures[i]);
      sprite.anchor = 0.5;
      sprite.x = _tileSize / 2;
      sprite.y = _tileSize / 2;
      sprite.angle = layer.angle ? layer.angle : 0;
      $tileContainer.addChild(sprite);
    });

    $tileContainer.label = 'TileContainer';
    $tileContainer.accessibleHint = tile.getID();
    $tileContainer.eventMode = 'dynamic';
    $tileContainer.height = _tileSize;
    $tileContainer.width = _tileSize;
    $tileContainer.pivot.x = _tileSize/2;
    $tileContainer.pivot.y = _tileSize/2;
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


