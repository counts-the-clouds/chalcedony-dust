ShapeRegistry.register('room-short', {
  draw: (drawing,segment) => {
    ShapeHelper.drawThreeLayeredPoly(drawing, segment, [[
      { x:13,  y:0  },
      { x:114, y:0  },
      { x:96,  y:18 },
      { x:31,  y:18 },
    ],[
      { x:9,   y:0  },
      { x:118, y:0  },
      { x:118, y:1  },
      { x:97,  y:22 },
      { x:30,  y:22 },
      { x:9,   y:1  },
    ],[
      { x:5,   y:0  },
      { x:122, y:0  },
      { x:122, y:2  },
      { x:98,  y:26 },
      { x:29,  y:26 },
      { x:5,   y:2  },
    ]]);

    return drawing;
  },
});
