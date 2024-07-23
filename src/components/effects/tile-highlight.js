global.TileHighlight = async function() {

  let $tweenContext;
  let $tweenState;

  const $mask = new PIXI.Graphics();

  const $sprite = new PIXI.Sprite(await PIXI.Assets.load('glow-effect'));
  $sprite.mask = $mask;

  const $container = new PIXI.Container();
  $container.addChild($mask);
  $container.addChild($sprite);
  $container.renderable = false;

  function getElement() { return $container; }

  function removeHighlight() {
    $container.renderable = false;
    $tweenContext = null;
    $tweenState = null;
  }

  function showHighlight(x,y) {
    const tileContainer = DungeonView.getTileContainerAt(x,y);

    if (tileContainer) {
      $tweenContext = { tileContainer }
      $tweenState = { shrink:(_tileSize * DungeonViewport.getScale() * 0.8), alpha:0 }
      positionHighlight();
      startTween();
    }
  }

  function updateScale() {
    positionHighlight();
  }

  function startTween() {
    let running = true;

    const tween = new Tween.Tween($tweenState);
    tween.to({ shrink:0, alpha:0.50 });
    tween.easing(Tween.Easing.Quadratic.InOut);
    tween.duration(2000);
    tween.start();

    tween.onUpdate(state => {
      if ($tweenState == null) {
        running = false;
        return;
      }
      $tweenState.shrink = state.shrink;
      $tweenState.alpha = state.alpha;
      updateSprite();
    })

    tween.onComplete(() => {
      running = false;
    });

    function animate() {
      if (running) {
        requestAnimationFrame(animate);
        Tween.update();
      }
    }
    animate();
  }

  function positionHighlight() {
    if ($tweenContext) {
      const position = $tweenContext.tileContainer.getGlobalPosition();
      const TS = _tileSize * DungeonViewport.getScale();
      const size =  TS*3;

      $mask.clear();
      $mask.beginFill('rgb(0,255,0)');
      $mask.drawRect(0, 0, size, size);
      $mask.endFill();
      $mask.drawRect(TS,TS,TS,TS);
      $mask.cut();

      updateSprite();

      $container.renderable = true;
      $container.x = position.x - TS;
      $container.y = position.y - TS;
    }
  }

  function updateSprite() {
    const TS = _tileSize * DungeonViewport.getScale();
    const size =  TS*3;

    $sprite.width = size - $tweenState.shrink;
    $sprite.height = size - $tweenState.shrink;
    $sprite.x = $tweenState.shrink/2;
    $sprite.y = $tweenState.shrink/2;
    $sprite.alpha = $tweenState.alpha;
  }

  return Object.freeze({
    getElement,
    updateScale,
    positionHighlight,
    showHighlight,
    removeHighlight,
  });
}
