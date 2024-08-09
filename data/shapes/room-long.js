ShapeRegistry.register('room-long', {
  draw: (drawing,segment) => {
    ShapeHelper.drawThreeLayeredPoly(drawing, segment, [[
      { x:13,  y:0   },
      { x:114, y:0   },
      { x:114, y:14  },
      { x:106, y:14  },
      { x:106, y:97  },
      { x:97,  y:106 },
      { x:30 , y:106 },
      { x:21,  y:97  },
      { x:21,  y:14  },
      { x:13,  y:14  },
    ],[
      { x:9,   y:0   },
      { x:118, y:0   },
      { x:118, y:18  },
      { x:110, y:18  },
      { x:110, y:99  },
      { x:99,  y:110 },
      { x:28,  y:110 },
      { x:17,  y:99  },
      { x:17,  y:18  },
      { x:9,   y:18  },
    ],[
      { x:5,   y:0   },
      { x:122, y:0   },
      { x:122, y:22  },
      { x:114, y:22  },
      { x:114, y:101 },
      { x:101, y:114 },
      { x:26,  y:114 },
      { x:13,  y:101 },
      { x:13,  y:22  },
      { x:5,   y:22  },
    ]]);
  },
});
