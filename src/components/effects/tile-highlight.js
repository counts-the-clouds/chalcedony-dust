global.TileHighlight = async function() {

  let $shrink = 0;

  const $mask = new PIXI.Graphics();

  const $sprite = new PIXI.Sprite(await PIXI.Assets.load('glow-effect'));
  $sprite.mask = $mask;

  const $container = new PIXI.Container();
  $container.addChild($mask);
  $container.addChild($sprite);
  $container.renderable = false;

  function getElement() { return $container; }

  function showHighlight(x,y) {
    $container.renderable = true;
    positionHighlight(x,y);
  }

  function positionHighlight(x,y) {
    const tileContainer = DungeonView.getTileContainerAt(x,y);
    if (tileContainer == null) {
      return;
    }
    const position = tileContainer.getGlobalPosition();
    const TS = _tileSize * DungeonViewport.getScale();
    const size =  TS*3;

    $mask.clear();
    $mask.beginFill('rgb(0,255,0)');
    $mask.drawRect(0, 0, size, size);
    $mask.endFill();
    $mask.drawRect(TS,TS,TS,TS);
    $mask.cut();

    $sprite.width = size - $shrink;
    $sprite.height = size - $shrink;
    $sprite.x = $shrink/2;
    $sprite.y = $shrink/2;
    $sprite.alpha = 1;

    $container.renderable = true;
    $container.x = position.x - TS;
    $container.y = position.y - TS;
  }

  return Object.freeze({
    getElement,
    showHighlight,
  });
}
