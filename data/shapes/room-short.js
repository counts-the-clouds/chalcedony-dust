ShapeRegistry.register('room-short', {

  draw: (drawing,segment) => {
    const state = segment.getState()
    const palette = ExtraRegistry.lookup('ColorPalette').segments.room[state];

    if (state === _incomplete) {
      drawing.poly([
        { x:8, y:0 },
        { x:119, y:0 },
        { x:96, y:23 },
        { x:31, y:23 },
      ]);
      drawing.fill(0xCCCCCC);

      drawing.poly([
        { x:12, y:0 },
        { x:115, y:0 },
        { x:95, y:20 },
        { x:32, y:20 },
      ]);
      drawing.fill(0xFFFFFF);
      drawing.tint = palette.base;
    }

    if (state === _complete) {
      drawing.poly([
        { x:5, y:0 },
        { x:122, y:0 },
        { x:122, y:2 },
        { x:98, y:26 },
        { x:29, y:26 },
        { x:5, y:2 },
      ]);
      drawing.fill(0xFFFFFF);

      drawing.poly([
        { x:8, y:0 },
        { x:119, y:0 },
        { x:96, y:23 },
        { x:31, y:23 },
      ]);
      drawing.fill(0xCCCCCC);
      drawing.tint = palette.base;
    }

    return drawing;
  },

});
