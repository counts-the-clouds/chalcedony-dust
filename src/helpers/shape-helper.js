global.ShapeHelper = {

  drawThreeLayeredPoly: function(drawing,segment,pointArrays) {
    const state = segment.getState();
    const type = segment.getType();
    const tint = ExtraRegistry.lookup('ColorPalette').segments[type][state].base;

    if (state === _incomplete) {
      drawing.poly(pointArrays[1]);
      drawing.fill(0xCCCCCC);
      drawing.poly(pointArrays[0]);
      drawing.fill(0xFFFFFF);
      drawing.tint = tint;
    }

    if (state === _complete) {
      drawing.poly(pointArrays[2]);
      drawing.fill(0xFFFFFF);
      drawing.poly(pointArrays[1]);
      drawing.fill(0xCCCCCC);
      drawing.tint = tint;
    }
  }

}