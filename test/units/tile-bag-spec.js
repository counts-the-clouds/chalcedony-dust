describe("TileBag", function() {

  beforeEach(function() {
    TileBag.reset();
  })

  it('draws tiles in sequence when the sequence is set', function() {
    TileBag.startTileSequence('tutorial-sequence');

    expect(TileBag.isSequence()).to.be.true;
    expect(TileBag.drawTile().getCode()).to.equal('baseline-h2-0');
    expect(TileBag.drawTile().getCode()).to.equal('baseline-h2-1');
    expect(TileBag.drawTile().getCode()).to.equal('baseline-r2-3');
    expect(TileBag.drawTile().getCode()).to.equal('baseline-r2-1');
    expect(TileBag.drawTile().getCode()).to.equal('baseline-h1-r1-0');
    expect(TileBag.isSequence()).to.be.false;
  });

  it('normally draws a random tile', function() {
    expect(TileBag.drawTile().getID()).to.be.above(0);
  });

});
