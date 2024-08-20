ShapeRegistry.register('node-small', {
  draw: (drawing,segment) => {
    const state = segment.getState()
    const color = ExtraRegistry.lookup('ColorPalette').segments.node[state];

    if (state === FeatureState.incomplete) {
      drawing.rect(38,38,52,52);
      drawing.fill(0xCCCCCC);
      drawing.rect(40,40,48,48);
      drawing.fill(0xFFFFFF);
      drawing.tint = color;
    }

    if (state !== FeatureState.incomplete) {
      drawing.rect(34,34,60,60);
      drawing.fill(0xFFFFFF);
      drawing.rect(38,38,52,52);
      drawing.fill(0xCCCCCC);
      drawing.tint = color;
    }
  }
});