global.ShapeHelper = {

  // The complete and incomplete versions of a shape have slightly different
  // sizes. We define a three layered shape with three bands, an inner, middle,
  // and outer band. The incomplete shape has the base band and a slightly
  // darker inner band. The completed shape has the base band and a brighter
  // outer band.
  drawThreeLayeredPoly: function(drawing,segment,pointArrays) {
    const state = segment.getState();
    const type = segment.getType();
    const tint = ExtraRegistry.lookup('ColorPalette').segments[type][state].base;

    if (state === FeatureState.incomplete) {
      drawing.poly(pointArrays[1]); // Middle
      drawing.fill(0xCCCCCC);
      drawing.poly(pointArrays[0]); // Inner
      drawing.fill(0xFFFFFF);
      drawing.tint = tint;
    }

    if (state === FeatureState.complete) {
      drawing.poly(pointArrays[2]); // Outer
      drawing.fill(0xFFFFFF);
      drawing.poly(pointArrays[1]); // Middle
      drawing.fill(0xCCCCCC);
      drawing.tint = tint;
    }
  },

  // When we need a three layered shape with a hole in the center it needs to
  // be drawn with two separate polys. Because there are three layers this then
  // requires six total polys.
  //   [0,1]  Inner Band
  //   [2,3]  Middle Band
  //   [4,5]  Outer Band
  drawSixLayeredPoly: function(drawing,segment,pointArrays) {
    const state = segment.getState();
    const type = segment.getType();
    const tint = ExtraRegistry.lookup('ColorPalette').segments[type][state].base;

    if (state === FeatureState.incomplete) {
      drawing.poly(pointArrays[2]); // Middle
      drawing.poly(pointArrays[3]);
      drawing.fill(0xCCCCCC);
      drawing.poly(pointArrays[0]); // Inner
      drawing.poly(pointArrays[1]);
      drawing.fill(0xFFFFFF);
      drawing.tint = tint;
    }

    if (state === FeatureState.complete) {
      drawing.poly(pointArrays[4]); // Outer
      drawing.poly(pointArrays[5]);
      drawing.fill(0xFFFFFF);
      drawing.poly(pointArrays[2]); // Middle
      drawing.poly(pointArrays[3]);
      drawing.fill(0xCCCCCC);
      drawing.tint = tint;
    }
  }

}