ShapeRegistry.register('core', {

  draw: graphics => {
    graphics.regularPoly(_tileSize/2, _tileSize/2, 50, 6);
  },

  getHitArea: () => {
    return new Pixi.Polygon([
      39,21,
      88,21,
      112,63,
      88,106,
      39,106,
      15,63
    ]);
  }

});