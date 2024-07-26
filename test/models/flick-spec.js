describe('Flick', function() {

  it('saves the initial state of the animation target', function() {
    const target = new PIXI.Container();
          target.angle = 69;
    const flick = Flick('rotate-ninety-widdershins');
          flick.setAnimationTarget(target);
    expect(flick.getInitialState().angle).to.equal(69);
  });

});
