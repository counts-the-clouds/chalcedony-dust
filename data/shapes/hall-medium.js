ShapeRegistry.register('hall-medium', {

  draw: (drawing,segment) => {
    const state = segment.getState()
    const palette = ExtraRegistry.lookup('ColorPalette').segments.hall[state];

    if (state === _incomplete) {
      drawing.rect(52,0,24,42);
      drawing.fill(0xCCCCCC);
      drawing.rect(54,0,20,40);
      drawing.fill(0xFFFFFF);
      drawing.tint = palette.base;
    }

    if (state === _complete) {
      drawing.rect(48,0,32,48);
      drawing.fill(0xFFFFFF);
      drawing.rect(52,0,24,44);
      drawing.fill(0xCCCCCC);
      drawing.tint = palette.base;
    }

    return drawing;
  },

});