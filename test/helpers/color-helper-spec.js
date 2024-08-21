describe('ColorHelper', function() {

  it.only('converts hex strings to color maps', function() {
    const rgb = ColorHelper.hexStringToColors('#FFDDAA');
    expect(rgb.r).to.equal(255);
    expect(rgb.g).to.equal(221);
    expect(rgb.b).to.equal(170);
  });

});
