
const points1 = [
  { x:54, y:0 },
  { x:73, y:0 },
]

const points2 = [
  { x:52, y:0 },
  { x:75, y:0 },
]

const points3 = [
  { x:48, y:0 },
  { x:79, y:0 },
]

ShapeRegistry.register('hall-tee-bent', {
  draw: (drawing,segment) => {
    const state = segment.getState();
    const palette = ExtraRegistry.lookup('ColorPalette').segments.hall[state];

    if (state === _incomplete) {
      drawing.poly(points2);
      drawing.fill(0xCCCCCC);
      drawing.poly(points1);
      drawing.fill(0xFFFFFF);
      drawing.tint = palette.base;
    }

    if (state === _complete) {
      drawing.poly(points3);
      drawing.fill(0xFFFFFF);
      drawing.poly(points2);
      drawing.fill(0xCCCCCC);
      drawing.tint = palette.base;
    }

    return drawing;
  },
});
