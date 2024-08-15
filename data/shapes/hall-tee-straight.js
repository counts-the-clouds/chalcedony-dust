ShapeRegistry.register('hall-tee-straight', {
  draw: (drawing,segment) => {
    const state = segment.getState()
    const palette = ExtraRegistry.lookup('ColorPalette').segments.hall[state];

    if (state === FeatureState.incomplete) {
      drawing.rect(52,0,24,64);
      drawing.rect(0,52,128,24);
      drawing.fill(0xCCCCCC);
      drawing.rect(54,0,20,64);
      drawing.rect(0,54,128,20);
      drawing.fill(0xFFFFFF);
      drawing.tint = palette.base;
    }

    if (state === FeatureState.complete) {
      drawing.rect(48,0,32,64);
      drawing.rect(0,48,128,32);
      drawing.fill(0xFFFFFF);
      drawing.rect(52,0,24,64);
      drawing.rect(0,52,128,24);
      drawing.fill(0xCCCCCC);
      drawing.tint = palette.base;
    }
  }
});