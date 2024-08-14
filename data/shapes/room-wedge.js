ShapeRegistry.register('room-wedge', {
  draw: (drawing,segment) => {
    ShapeHelper.drawThreeLayeredPoly(drawing, segment, [[
      { x:13,  y:0  },
      { x:114, y:0  },
      { x:114, y:1  },
      { x:88,  y:27 },
      { x:39,  y:27 },
      { x:13,  y:1  },
    ],[
      { x:9,   y:0  },
      { x:118, y:0  },
      { x:118, y:2  },
      { x:93,  y:27 },
      { x:34,  y:27 },
      { x:9,   y:2  },
    ],[
      { x:5,   y:0  },
      { x:122, y:0  },
      { x:122, y:3  },
      { x:98,  y:27 },
      { x:29,  y:27 },
      { x:5,   y:3  },
    ]]);
  },
});
