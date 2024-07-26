global.TileHighlight = (function() {

  let $mask;
  let $sprite;
  let $container;
  let $tweenContext;
  let $tweenState;

  async function build() {
    $mask = new Pixi.Graphics();

    $sprite = new Pixi.Sprite(await Pixi.Assets.load('glow-effect'));
    $sprite.mask = $mask;

    $container = new Pixi.Container();
    $container.addChild($mask);
    $container.addChild($sprite);
    $container.renderable = false;

    return $container;
  }

  function show(x,y) {
    const cellContainer = DungeonView.getCellContainerAt(x,y);

    if (cellContainer) {
      $tweenContext = { cellContainer }
      $tweenState = { shrink:(_tileSize * DungeonViewport.getScale() * 0.8), alpha:0 }
      updatePosition();

      // TODO: Turn this into an Animation
      // startTween();
    }
  }

  function hide() {
    $container.renderable = false;
    $tweenContext = null;
    $tweenState = null;
  }

  function updatePosition() {
    if ($tweenContext) {
      const position = $tweenContext.cellContainer.getPosition();
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

  return Object.freeze({
    build,
    show,
    hide,
    updatePosition,
  });

})();
