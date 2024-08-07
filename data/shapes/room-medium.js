
const points1 = [
  { x:13,  y:0  },
  { x:114, y:0  },
  { x:114, y:61 },
  { x:105, y:70 },
  { x:22,  y:70 },
  { x:13,  y:61 },
]

const points2 = [
  { x:9,   y:0  },
  { x:118, y:0  },
  { x:118, y:63 },
  { x:107, y:74 },
  { x:20,  y:74 },
  { x:9,   y:63 },
]

const points3 = [
  { x:5,   y:0  },
  { x:122, y:0  },
  { x:122, y:65 },
  { x:108, y:78 },
  { x:18,  y:78 },
  { x:5,   y:65 },
]

ShapeRegistry.register('room-medium', {
  draw: (drawing,segment) => {
    const state = segment.getState();
    const palette = ExtraRegistry.lookup('ColorPalette').segments.room[state];

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
