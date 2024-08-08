ShapeRegistry.register('room-tee-straight', {
  draw: (drawing,segment) => {
    ShapeHelper.drawThreeLayeredPoly(drawing, segment, [[
      { x:13,  y:0   },
      { x:114, y:0   },
      { x:114, y:13  },
      { x:127, y:13  },
      { x:127, y:114 },
      { x:113, y:114 },
      { x:113, y:106 },
      { x:14,  y:106 },
      { x:14,  y:114 },
      { x:0,   y:114 },
      { x:0,   y:13  },
      { x:13,  y:13  },
    ],[
      { x:9,   y:0   },
      { x:118, y:0   },
      { x:118, y:9   },
      { x:127, y:9   },
      { x:127, y:118 },
      { x:109, y:118 },
      { x:109, y:110 },
      { x:18,  y:110 },
      { x:18,  y:118 },
      { x:0,   y:118 },
      { x:0,   y:9   },
      { x:9,   y:9   },
    ],[
      { x:5,   y:0   },
      { x:122, y:0   },
      { x:122, y:5   },
      { x:127, y:5   },
      { x:127, y:122 },
      { x:105, y:122 },
      { x:105, y:114 },
      { x:22,  y:114 },
      { x:22,  y:122 },
      { x:0,   y:122 },
      { x:0,   y:5   },
      { x:5,   y:5   },
    ]]);

    return drawing;
  },
});
