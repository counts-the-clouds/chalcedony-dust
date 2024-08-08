
const points1 = [
  { x:54, y:0 },
  { x:73, y:0 },
  { x:73, y:22 },
  { x:105, y:22 },
  { x:105, y:54 },
  { x:127, y:54 },
  { x:127, y:73 },
  { x:86, y:73 },
  { x:86, y:41 },
  { x:41, y:41 },
  { x:41, y:73 },
  { x:0, y:73 },
  { x:0, y:54 },
  { x:22, y:54 },
  { x:22, y:22 },
  { x:54, y:22 },
]

const points2 = [
  { x:52, y:0 },
  { x:75, y:0 },
  { x:75, y:20 },
  { x:107, y:20 },
  { x:107, y:52 },
  { x:127, y:52 },
  { x:127, y:75 },
  { x:84, y:75 },
  { x:84, y:43 },
  { x:43, y:43 },
  { x:43, y:75 },
  { x:0, y:75 },
  { x:0, y:52 },
  { x:20, y:52 },
  { x:20, y:20 },
  { x:52, y:20 },
]

const points3 = [
  { x:48, y:0 },
  { x:79, y:0 },
  { x:79, y:16 },
  { x:111, y:16 },
  { x:111, y:48 },
  { x:127, y:48 },
  { x:127, y:79 },
  { x:80, y:79 },
  { x:80, y:47 },
  { x:47, y:47 },
  { x:47, y:79 },
  { x:0, y:79 },
  { x:0, y:48 },
  { x:16, y:48 },
  { x:16, y:16 },
  { x:48, y:16 },
]

ShapeRegistry.register('hall-tee-steps', {
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
