ShapeRegistry.register('resource-node', {
  draw: (drawing,segment) => {
    ShapeHelper.drawThreeLayeredPoly(drawing, segment, [[
      { x:0, y:0 },
    ],[
      { x:43,  y:14  },
      { x:84,  y:14  },
      { x:113, y:43  },
      { x:113, y:84  },
      { x:84,  y:113 },
      { x:43,  y:113 },
      { x:14,  y:84  },
      { x:14,  y:43  },
    ],[
      { x:41,  y:10  },
      { x:86,  y:10  },
      { x:117, y:41  },
      { x:117, y:86  },
      { x:86,  y:117 },
      { x:41,  y:117 },
      { x:10,  y:86  },
      { x:10,  y:41  },
    ]]);
  },
});
