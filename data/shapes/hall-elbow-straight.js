ShapeRegistry.register('hall-elbow-straight', {
  draw: (drawing,segment) => {
    const state = segment.getState()
    const color = ExtraRegistry.lookup('ColorPalette').segments.hall[state];

    if (state === FeatureState.incomplete) {
      drawing.rect(52,0,24,76);
      drawing.rect(0,52,76,24);
      drawing.fill(0xCCCCCC);

      drawing.rect(54,0,20,74);
      drawing.rect(0,54,74,20);
      drawing.fill(0xFFFFFF);

      drawing.tint = color;
    }

    if (state !== FeatureState.incomplete) {
      drawing.rect(48,0,32,80);
      drawing.rect(0,48,80,32);
      drawing.fill(0xFFFFFF);

      drawing.rect(52,0,24,76);
      drawing.rect(0,52,76,24);
      drawing.fill(0xCCCCCC);

      drawing.tint = color;
    }
  }
});