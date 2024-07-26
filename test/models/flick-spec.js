describe('Flick', function() {

  it('saves the initial state of the animation target', function() {
    const target = new PIXI.Container();
          target.angle = 69;
    const flick = Flick('rotate-ninety-widdershins');
          flick.setAnimationTarget(target);
    expect(flick.getInitialState().angle).to.equal(69);
  });

  describe("getEasing()", function() {
    it('gets the easing of a keyframe', function() {
      const flick = Flick('no-rotation-widdershins');
            flick.setFrameIndex(1);
      expect(flick.getEasing()).to.equal(Tween.Easing.Quadratic.Out);
    });

    it('gets the base easing of a Flick', function() {
      const flick = Flick('rotate-ninety-widdershins');
      expect(flick.getEasing()).to.equal(Tween.Easing.Quadratic.InOut);
    });

    // There are none yet.
    it('gets the default easing')
  });

});
