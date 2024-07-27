global.TileHighlight = (function() {

  let $mask;
  let $sprite;
  let $highlightContainer;
  let $highlightedCell;

  async function build() {
    console.log("Building Tile Highlight");
    const TS = _tileSize * DungeonViewport.getScale();
    const size =  TS*3;

    $mask = new Pixi.Graphics();
    $mask.clear();
    $mask.fill('rgb(0,255,0)');
    $mask.rect(0, 0, size, size);

    $mask.fill('rgb(255,255,255)');
    $mask.rect(TS,TS,TS,TS);
    $mask.cut();

    $sprite = new Pixi.Sprite(await Pixi.Assets.load('glow-effect'));
    $sprite.mask = $mask;
    $sprite.width = size;
    $sprite.height = size;

    $highlightContainer = new Pixi.Container();
    $highlightContainer.addChild($mask);
    $highlightContainer.addChild($sprite);
    $highlightContainer.renderable = false;

    return $highlightContainer;
  }

  function show(x,y) {
    $highlightedCell = DungeonView.getCellContainerAt(x,y);

    updatePosition();

    if ($highlightedCell) {
      AnimationController.addAnimation('tile-highlight-outer','(THO)',{
        sprite: $sprite,
      });
    }
  }

  function hide() {
    AnimationController.stop('(THO)');
    $highlightContainer.renderable = false;
    $highlightedCell = null;
  }

  function updatePosition() {
    if ($highlightedCell) {
      const position = $highlightedCell.getPosition();
      const TS = _tileSize * DungeonViewport.getScale()

      $highlightContainer.renderable = true;
      $highlightContainer.x = position.x - TS;
      $highlightContainer.y = position.y - TS;
    }
  }

  return Object.freeze({
    build,
    show,
    hide,
    updatePosition,
  });

})();
