ShapeRegistry.register('room-across-narrow', {
  draw: (drawing,segment) => {
    ShapeHelper.drawThreeLayeredPoly(drawing, segment, [[
      { x:0,   y:13  },
      { x:18,  y:13  },
      { x:38,  y:33  },
      { x:89,  y:33  },
      { x:109, y:13  },
      { x:127, y:13  },
      { x:127, y:114 },
      { x:109, y:114 },
      { x:89,  y:94  },
      { x:38,  y:94  },
      { x:18,  y:114 },
      { x:0,   y:114 },
    ],[
      { x:0,   y:9   },
      { x:21,  y:9   },
      { x:41,  y:29  },
      { x:86,  y:29  },
      { x:106, y:9   },
      { x:127, y:9   },
      { x:127, y:118 },
      { x:106, y:118 },
      { x:86,  y:98  },
      { x:41,  y:98  },
      { x:21,  y:118 },
      { x:0,   y:118 },
    ],[
      { x:0,   y:5   },
      { x:22,  y:5   },
      { x:42,  y:25  },
      { x:85,  y:25  },
      { x:105, y:5   },
      { x:127, y:5   },
      { x:127, y:122 },
      { x:105, y:122 },
      { x:85,  y:102 },
      { x:42,  y:102 },
      { x:22,  y:122 },
      { x:0,   y:122 },
    ]]);
  },
});
