ShapeRegistry.register('room-corner-notch', {
  draw: (drawing,segment) => {
    ShapeHelper.drawThreeLayeredPoly(drawing, segment, [[
      { x:13,  y:0   },
      { x:114, y:0   },
      { x:114, y:12  },
      { x:89,  y:37  },
      { x:37,  y:37  },
      { x:37,  y:89  },
      { x:12,  y:114 },
      { x:0,   y:114 },
      { x:0,   y:13  },
      { x:13,  y:13  },
    ],[
      { x:9,   y:0   },
      { x:118, y:0   },
      { x:118, y:14  },
      { x:91,  y:41  },
      { x:41,  y:41  },
      { x:41,  y:91  },
      { x:14,  y:118 },
      { x:0,   y:118 },
      { x:0,   y:9   },
      { x:9,   y:9   },
    ],[
      { x:5,   y:0   },
      { x:122, y:0   },
      { x:122, y:16  },
      { x:93,  y:45  },
      { x:45,  y:45  },
      { x:45,  y:93  },
      { x:16,  y:122 },
      { x:0,   y:122 },
      { x:0,   y:5   },
      { x:5,   y:5   },
    ]]);

    return drawing;
  },
});
