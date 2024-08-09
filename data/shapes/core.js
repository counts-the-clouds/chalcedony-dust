ShapeRegistry.register('core', {
  draw: drawing => {
    const palette = ExtraRegistry.lookup('ColorPalette').segments.core.complete;

    drawing.regularPoly(_tileSize/2, _tileSize/2, 56, 8, 0.3926991);
    drawing.fill(0xFFFFFF);
    drawing.regularPoly(_tileSize/2, _tileSize/2, 50, 8, 0.3926991);
    drawing.fill(0xCCCCCC);
    drawing.tint = palette.base;
  },
});