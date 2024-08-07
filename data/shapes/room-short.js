
const points1 = [
  { x:13,  y:0  },
  { x:114, y:0  },
  { x:96,  y:18 },
  { x:31,  y:18 },
]

const points2 = [
  { x:9,   y:0  },
  { x:118, y:0  },
  { x:118, y:1  },
  { x:97,  y:22 },
  { x:30,  y:22 },
  { x:9,   y:1  },
]

const points3 = [
  { x:5,   y:0  },
  { x:122, y:0  },
  { x:122, y:2  },
  { x:98,  y:26 },
  { x:29,  y:26 },
  { x:5,   y:2  },
]

ShapeRegistry.register('room-short', {
  draw: (drawing,segment) => {
    const state = segment.getState()
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
