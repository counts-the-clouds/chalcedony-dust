ShapeRegistry.register('hall-long', {
  draw: (drawing,segment) => {
    const state = segment.getState()
    const color = ExtraRegistry.lookup('ColorPalette').segments.hall[state];

    if (state === FeatureState.incomplete) {
      drawing.rect(52,0,24,102);
      drawing.fill(0xCCCCCC);
      drawing.rect(54,0,20,100);
      drawing.fill(0xFFFFFF);
      drawing.tint = color;
    }

    if (state !== FeatureState.incomplete) {
      drawing.rect(48,0,32,108);
      drawing.fill(0xFFFFFF);
      drawing.rect(52,0,24,104);
      drawing.fill(0xCCCCCC);
      drawing.tint = color;
    }
  },
});