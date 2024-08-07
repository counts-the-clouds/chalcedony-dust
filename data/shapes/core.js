ShapeRegistry.register('core', {

  drawBase: graphics => {
    graphics.regularPoly(_tileSize/2, _tileSize/2, 56, 8, 0.3926991);

    const shadow = new Pixi.Sprite(AssetLibrary.fetch('cell-inner-highlight-1'));
    shadow.x = 50
    shadow.y = 50

    graphics.addChild(shadow)
  },


});