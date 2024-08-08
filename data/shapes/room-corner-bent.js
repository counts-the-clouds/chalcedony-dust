
const points1 = [
  { x:13,  y:0   },
  { x:114, y:0   },
  { x:114, y:29  },
  { x:29,  y:114 },
  { x:0,   y:114 },
  { x:0,   y:13  },
  { x:13,  y:13  },
]

const points2 = [
  { x:9,   y:0   },
  { x:118, y:0   },
  { x:118, y:32  },
  { x:32,  y:118 },
  { x:0,   y:118 },
  { x:0,   y:9   },
  { x:9,   y:9   },
]

const points3 = [
  { x:5, y:0 },
  { x:122, y:0 },
  { x:122, y:34 },
  { x:34, y:122 },
  { x:0, y:122 },
  { x:0, y:5 },
  { x:5, y:5 },
]

ShapeRegistry.register('room-corner-bent', {
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
