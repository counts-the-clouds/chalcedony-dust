global.TileContainer = async function(tile) {

  const $tile = tile;
  const $tileContainer = new Pixi.Container();
  const $background = new Pixi.Graphics;

  const $layers = {};
  $tile.getLayers().forEach(layer => {
    $layers[layer.segmentID] = layer;
  });

  let $clockContainer;

  function getID() { return $tile.getID(); }
  function getTile() { return $tile; }
  function getTileContainer() { return $tileContainer; }

  async function buildContainer() {
    addBackground()

    await Promise.all(Object.values($layers).map(async layer => {
      await addLayer(layer);
    }));

    $tileContainer.label = 'TileContainer';
    $tileContainer.accessibleHint = tile.getID();
    $tileContainer.eventMode = 'dynamic';
    $tileContainer.height = _tileSize;
    $tileContainer.width = _tileSize;
    $tileContainer.pivot.x = _tileSize/2;
    $tileContainer.pivot.y = _tileSize/2;
  }

  function addBackground() {
    $background.rect(0,0,_tileSize,_tileSize);
    $background.fill('rgb(0,0,0)');

    $tileContainer.addChild($background);
  }

  async function addLayer(layer) {
    try {

      if (layer.style === _singleTexture) {
        const sprite = await buildLayerSprite(layer, layer.texture, layer.color);
        $layers[layer.segmentID].sprite = sprite;
        $tileContainer.addChild(sprite);
      }

      if (layer.style === _wallAndGround) {
        const groundSprite = await buildLayerSprite(layer, `${layer.texture}-g`, layer.groundColor);
        const wallSprite = await buildLayerSprite(layer, `${layer.texture}-w`, layer.wallColor);

        $layers[layer.segmentID].groundSprite = groundSprite;
        $layers[layer.segmentID].wallSprite = wallSprite;

        $tileContainer.addChild(groundSprite);
        $tileContainer.addChild(wallSprite);
      }
    }
    catch(error) {
      const segment = SegmentDataStore.get(layer.segmentID);
      logError(`Error building layer for ${segment} (${segment.getTile().getID()}:${segment.getTile().getCode()})`,error,{
        system:'TileContainer',
        data:{ layer }
      });
    }
  }

  async function buildLayerSprite(layer, textureName, color) {
    const texture = await Pixi.Assets.load(textureName);

    const sprite = new Pixi.Sprite(texture);
    sprite.anchor = 0.5;
    sprite.x = _tileSize / 2;
    sprite.y = _tileSize / 2;
    sprite.angle = layer.angle ? layer.angle : 0;

    if (color) {
      sprite.tint = color || 0xFFFFFF;
    }

    return sprite;
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

  async function enableClock() {
    const clock = getTile().getClock();
    if (clock) {
      $clockContainer = await ClockContainer(clock);

      clock.attachTileContainer(this);

      $tileContainer.addChild($clockContainer.getContainer());

      ClockManager.addClock(clock);
    }
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

  function segmentComplete(segment) {
    console.log(`WIP: TileContainer.segmentComplete() - ${segment}`);
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
    updateClock,
    setOnShelf,
    segmentComplete,
  };
};


