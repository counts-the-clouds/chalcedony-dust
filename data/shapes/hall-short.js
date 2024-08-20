ShapeRegistry.register('hall-short', {
  draw: (drawing,segment) => {
    const state = segment.getState()
    const color = ExtraRegistry.lookup('ColorPalette').segments.hall[state];

    if (state === FeatureState.incomplete) {
      drawing.rect(52,0,24,22);
      drawing.fill(0xCCCCCC);
      drawing.rect(54,0,20,20);
      drawing.fill(0xFFFFFF);
      drawing.tint = color;
    }

    if (state !== FeatureState.incomplete) {
      drawing.rect(48,0,32,28);
      drawing.fill(0xFFFFFF);
      drawing.rect(52,0,24,24);
      drawing.fill(0xCCCCCC);
      drawing.tint = color;
    }
  }
});