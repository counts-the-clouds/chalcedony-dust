ShapeRegistry.register('room-cross-full', {
  draw: (drawing,segment) => {
    ShapeHelper.drawThreeLayeredPoly(drawing, segment, [[
      { x:13 , y:0   },
      { x:114, y:0   },
      { x:114, y:13  },
      { x:127, y:13  },
      { x:127, y:114 },
      { x:114, y:114 },
      { x:114, y:127 },
      { x:13,  y:127 },
      { x:13,  y:114 },
      { x:0,   y:114 },
      { x:0,   y:13  },
      { x:13,  y:13  },
    ],[
      { x:9,   y:0   },
      { x:118, y:0   },
      { x:118, y:9   },
      { x:127, y:9   },
      { x:127, y:118 },
      { x:118, y:118 },
      { x:118, y:127 },
      { x:9,   y:127 },
      { x:9,   y:118 },
      { x:0,   y:118 },
      { x:0,   y:9   },
      { x:9,   y:9   },
    ],[
      { x:5,   y:0   },
      { x:122, y:0   },
      { x:122, y:5   },
      { x:127, y:5   },
      { x:127, y:122 },
      { x:122, y:122 },
      { x:122, y:127 },
      { x:5,   y:127 },
      { x:5,   y:122 },
      { x:0,   y:122 },
      { x:0,   y:5   },
      { x:5,   y:5   },
    ]]);
  },
});
