describe('Segment', function() {

  describe('getExits()', function() {
    it('gets the raw exit data by default', function() {
      const tile = Tile({ code:'baseline-h2-0' });
      expect(tile.getSegments()[0].getExits()).to.have.members([_n,_w]);
    });

    it('rotates 90 degrees', function() {
      const tile = Tile({ code:'baseline-h2-0' });
      expect(tile.getSegments()[0].getExits(1)).to.have.members([_n,_e]);
    });

    it('rotates 180 degrees', function() {
      const tile = Tile({ code:'baseline-h2-0' });
      expect(tile.getSegments()[0].getExits(2)).to.have.members([_s,_e]);
    });

    it('rotates 270 degrees', function() {
      const tile = Tile({ code:'baseline-h2-0' });
      expect(tile.getSegments()[0].getExits(3)).to.have.members([_s,_w]);
    });
  });

})