ShapeRegistry.register('node-small', {
  draw: (drawing,segment) => {
    const state = segment.getState()
    const palette = ExtraRegistry.lookup('ColorPalette').segments.hall[state];

    if (state === _incomplete) {
      drawing.rect(38,38,52,52);
      drawing.fill(0xCCCCCC);
      drawing.rect(40,40,48,48);
      drawing.fill(0xFFFFFF);
      drawing.tint = palette.base;
    }

    if (state === _complete) {
      drawing.rect(34,34,60,60);
      drawing.fill(0xFFFFFF);
      drawing.rect(38,38,52,52);
      drawing.fill(0xCCCCCC);
      drawing.tint = palette.base;
    }

    return drawing;
  }
});