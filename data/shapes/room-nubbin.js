ShapeRegistry.register('room-nubbin', {
  draw: (drawing,segment) => {
    ShapeHelper.drawThreeLayeredPoly(drawing, segment, [[
      { x:13,  y:0  },
      { x:114, y:0  },
      { x:114, y:3  },
      { x:85,  y:3  },
      { x:85,  y:37 },
      { x:42,  y:37 },
      { x:42,  y:3  },
      { x:13,  y:3  },
    ],[
      { x:9,   y:0  },
      { x:118, y:0  },
      { x:118, y:5  },
      { x:116, y:7  },
      { x:89,  y:7  },
      { x:89,  y:39 },
      { x:87,  y:41 },
      { x:40,  y:41 },
      { x:38,  y:39 },
      { x:38,  y:7  },
      { x:11,  y:7  },
      { x:9,   y:5  },
    ],[
      { x:5,   y:0  },
      { x:122, y:0  },
      { x:122, y:6  },
      { x:117, y:11 },
      { x:93,  y:11 },
      { x:93,  y:40 },
      { x:88,  y:45 },
      { x:39,  y:45 },
      { x:34,  y:40 },
      { x:34,  y:11 },
      { x:10,  y:11 },
      { x:5 ,  y:6  },
    ]]);

    return drawing;
  },
});
