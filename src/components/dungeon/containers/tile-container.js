global.TileContainer = async function(tile) {

  const $tile = tile;
  const $tileContainer = new Pixi.Container();
  const $background = new Pixi.Graphics;

  let $clockContainer;

  function getID() { return $tile.getID(); }
  function getTile() { return $tile; }
  function getTileContainer() { return $tileContainer; }

  async function buildContainer() {
    addBackground()

    await Promise.all(tile.getSegments().map(async segment => {
      await addSegment(segment.getGraphics());
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

  async function addSegment(graphics) {
    try {
      if (graphics.style === _singleTexture) {
        $tileContainer.addChild(await buildSingleTextureLayer(graphics))
      }
      if (graphics.style === _wallAndGround) {
        $tileContainer.addChild(await buildWallAndGroundLayer(graphics))
      }
    }
    catch(error) {
      const segment = SegmentDataStore.get(graphics.segmentID);
      logError(`Error building graphics for ${segment} (${segment.getTile().getID()}:${segment.getTile().getCode()})`,error,{
        system:'TileContainer',
        data:{ graphics }
      });
    }
  }

  async function buildSingleTextureLayer(graphics) {
    return await buildSegmentSprite(graphics, graphics.texture, graphics.color);
  }

  async function buildWallAndGroundLayer(graphics) {
    const groundSprite = await buildSegmentSprite(graphics, `${graphics.texture}-g`, graphics.groundColor);
    const wallSprite = await buildSegmentSprite(graphics, `${graphics.texture}-w`, graphics.wallColor);
    const container = new Pixi.Container();

    container.addChild(groundSprite);
    container.addChild(wallSprite);

    return container;
  }

  async function buildSegmentSprite(graphics, textureName, color) {
    const texture = await Pixi.Assets.load(textureName);

    const sprite = new Pixi.Sprite(texture);
    sprite.anchor = 0.5;
    sprite.x = _tileSize / 2;
    sprite.y = _tileSize / 2;
    sprite.angle = graphics.angle ? graphics.angle : 0;

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

  async function segmentComplete(segment) {
    const graphics = segment.getGraphics();

    let newLayer;
    if (graphics.style === _singleTexture) {
      newLayer = await buildSingleTextureLayer(graphics);
    }
    if (graphics.style === _wallAndGround) {
      newLayer = await buildWallAndGroundLayer(graphics);
    }

    $tileContainer.removeChildAt(graphics.layerIndex).destroy({ children:true });
    $tileContainer.addChildAt(newLayer, graphics.layerIndex);
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


