ShapeRegistry.register('node-large', {
  draw: (drawing,segment) => {
    ShapeHelper.drawThreeLayeredPoly(drawing, segment, [[
      { x:37, y:30 },
      { x:90, y:30 },
      { x:97, y:37 },
      { x:97, y:90 },
      { x:90, y:97 },
      { x:37, y:97 },
      { x:30, y:90 },
      { x:30, y:37 },
    ],[
      { x:35, y:28 },
      { x:92, y:28 },
      { x:99, y:35 },
      { x:99, y:92 },
      { x:92, y:99 },
      { x:35, y:99 },
      { x:28, y:92 },
      { x:28, y:35 },
    ],[
      { x:33,  y:24  },
      { x:94,  y:24  },
      { x:103, y:33  },
      { x:103, y:94  },
      { x:94,  y:103 },
      { x:33,  y:103 },
      { x:24,  y:94  },
      { x:24,  y:33  },
    ]]);
  },
});
