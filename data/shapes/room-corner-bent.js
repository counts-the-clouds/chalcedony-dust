ShapeRegistry.register('room-corner-bent', {
  draw: (drawing,segment) => {
    ShapeHelper.drawThreeLayeredPoly(drawing, segment, [[
      { x:13,  y:0   },
      { x:114, y:0   },
      { x:114, y:29  },
      { x:29,  y:114 },
      { x:0,   y:114 },
      { x:0,   y:13  },
      { x:13,  y:13  },
    ],[
      { x:9,   y:0   },
      { x:118, y:0   },
      { x:118, y:32  },
      { x:32,  y:118 },
      { x:0,   y:118 },
      { x:0,   y:9   },
      { x:9,   y:9   },
    ],[
      { x:5,   y:0   },
      { x:122, y:0   },
      { x:122, y:34  },
      { x:34,  y:122 },
      { x:0,   y:122 },
      { x:0,   y:5   },
      { x:5,   y:5   },
    ]]);
  },
});
