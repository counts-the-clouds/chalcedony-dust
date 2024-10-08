global.InnerCellHighlight = (function () {

  let $container;
  let $highlights;

  async function build() {
    $highlights = {
      h_1: new Pixi.Sprite(AssetLibrary.fetch('cell-inner-highlight-1')),
      h_2c: new Pixi.Sprite(AssetLibrary.fetch('cell-inner-highlight-2c')),
      h_2s: new Pixi.Sprite(AssetLibrary.fetch('cell-inner-highlight-2s')),
      h_3: new Pixi.Sprite(AssetLibrary.fetch('cell-inner-highlight-3')),
      h_4: new Pixi.Sprite(AssetLibrary.fetch('cell-inner-highlight-4')),
    }

    $container = new Pixi.Container();
    $container.pivot.x = _tileSize/2;
    $container.pivot.y = _tileSize/2;

    Object.values($highlights).forEach(sprite => {
      sprite.renderable = false;
      sprite.anchor = 0.5;
      sprite.x = _tileSize/2;
      sprite.y = _tileSize/2;

      $container.addChild(sprite);
    });

    return $container;
  }

  function show(cellContainer, placementStatus) {
    positionContainer(cellContainer.getCellContainer().getGlobalPosition());

    const yarp = (dir) => { return (placementStatus[dir] === 'yes') ? 1 : 0 }

    switch (yarp('n') + yarp('s') + yarp('e') + yarp('w')) {
      case 1: return fadeIn(showSinglePlacement(placementStatus), cellContainer);
      case 2: return fadeIn(showDoublePlacement(placementStatus), cellContainer);
      case 3: return fadeIn(showTriplePlacement(placementStatus), cellContainer);
      case 4: return fadeIn(showQuadPlacement(), cellContainer);
      default: throw `InnerCellHighlight.show() called with no active cells in the placement status.`;
    }
  }

  function showSinglePlacement(placementStatus) {
    let highlight = $highlights['h_1'];
    highlight.angle = 0;
    highlight.alpha = 0;
    highlight.renderable = true;

    if (placementStatus.e === 'yes') { highlight.angle = 90 }
    if (placementStatus.s === 'yes') { highlight.angle = 180 }
    if (placementStatus.w === 'yes') { highlight.angle = 270 }

    return highlight;
  }

  function showDoublePlacement(placementStatus) {
    let type, angle, highlight;

    if (placementStatus.n === 'yes' && placementStatus.w === 'yes') { type='corner'; angle=0 }
    if (placementStatus.n === 'yes' && placementStatus.e === 'yes') { type='corner'; angle=90 }
    if (placementStatus.s === 'yes' && placementStatus.e === 'yes') { type='corner'; angle=180 }
    if (placementStatus.s === 'yes' && placementStatus.w === 'yes') { type='corner'; angle=270 }
    if (placementStatus.e === 'yes' && placementStatus.w === 'yes') { type='sides'; angle=0 }
    if (placementStatus.n === 'yes' && placementStatus.s === 'yes') { type='sides'; angle=90 }

    if (type == null) {
      throw `Invalid Double Placement Status: ${JSON.stringify(placementStatus)}`
    }

    highlight = $highlights[type === 'corner' ? 'h_2c' : 'h_2s'];
    highlight.angle = angle;
    highlight.alpha = 0;
    highlight.renderable = true;

    return highlight;
  }

  function showTriplePlacement(placementStatus) {
    let highlight = $highlights['h_3'];
    highlight.angle = 0;
    highlight.alpha = 0;
    highlight.renderable = true;

    if (placementStatus.w !== 'yes') { highlight.angle = 90 }
    if (placementStatus.n !== 'yes') { highlight.angle = 180 }
    if (placementStatus.e !== 'yes') { highlight.angle = 270 }

    return highlight;
  }

  function showQuadPlacement() {
    let highlight = $highlights['h_4'];
    highlight.renderable = true;
    highlight.alpha = 0;

    return highlight;
  }

  function positionContainer(position) {
    const tileSize = DungeonView.getTileSize();
    $container.width = tileSize;
    $container.height = tileSize;
    $container.x = position.x + tileSize/2;
    $container.y = position.y + tileSize/2;
  }

  function fadeIn(highlight, cellContainer) {
    AnimationController.addAnimation('fade-in', cellContainer.getID(), { target:highlight, duration:500 });
  }

  function hide() {
    Object.values($highlights).forEach(sprite => {
      sprite.renderable = false;
    });
  }

  return Object.freeze({
    build,
    show,
    hide,
  });

})();
