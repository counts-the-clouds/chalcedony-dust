ShapeRegistry.register('room-medium', {
  draw: (drawing,segment) => {
    ShapeHelper.drawThreeLayeredPoly(drawing, segment, [[
      { x:13,  y:0  },
      { x:114, y:0  },
      { x:114, y:61 },
      { x:105, y:70 },
      { x:22,  y:70 },
      { x:13,  y:61 },
    ],[
      { x:9,   y:0  },
      { x:118, y:0  },
      { x:118, y:63 },
      { x:107, y:74 },
      { x:20,  y:74 },
      { x:9,   y:63 },
    ],[
      { x:5,   y:0  },
      { x:122, y:0  },
      { x:122, y:65 },
      { x:108, y:78 },
      { x:18,  y:78 },
      { x:5,   y:65 },
    ]]);

    return drawing;
  },
});
