ShapeRegistry.register('hall-tee-bent', {
  draw: (drawing,segment) => {
    ShapeHelper.drawThreeLayeredPoly(drawing, segment, [[
      { x:54,  y:0  },
      { x:73,  y:0  },
      { x:73,  y:12 },
      { x:115, y:54 },
      { x:127, y:54 },
      { x:127, y:73 },
      { x:109, y:73 },
      { x:65,  y:29 },
      { x:62,  y:29 },
      { x:18,  y:73 },
      { x:0,   y:73 },
      { x:0,   y:54 },
      { x:12,  y:54 },
      { x:54,  y:12 },
    ],[
      { x:52,  y:0  },
      { x:75,  y:0  },
      { x:75,  y:12 },
      { x:115, y:52 },
      { x:127, y:52 },
      { x:127, y:75 },
      { x:109, y:75 },
      { x:65,  y:31 },
      { x:62,  y:31 },
      { x:18,  y:75 },
      { x:0,   y:75 },
      { x:0,   y:52 },
      { x:12,  y:52 },
      { x:52,  y:12 },
    ],[
      { x:48,  y:0  },
      { x:79,  y:0  },
      { x:79,  y:11 },
      { x:116, y:48 },
      { x:127, y:48 },
      { x:127, y:79 },
      { x:108, y:79 },
      { x:65,  y:36 },
      { x:62,  y:36 },
      { x:19,  y:79 },
      { x:0,   y:79 },
      { x:0,   y:48 },
      { x:11,  y:48 },
      { x:48,  y:11 },
    ]]);
  },
});