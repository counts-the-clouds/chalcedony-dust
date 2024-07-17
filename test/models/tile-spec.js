describe("Tile", function() {

  describe("Tile Rotation", function() {

    it('is not rotated by default', function() {
      expect(Tile('forest-1').getRotation()).to.equal(0);
    });

    it('throws on invalid rotations',function() {
      let tile = Tile('forest-2');
      expect(() => { tile.setRotation('zomg'); }).to.throw();
      expect(() => { tile.setRotation(-1); }).to.throw();
      expect(() => { tile.setRotation(5); }).to.throw();
    });

    it('setting rotation rotates tiles',function() {
      let tile = Tile('forest-1');
      expect(tile.getEdges().s).to.equal('forest-path');
      expect(tile.getEdges().n).to.equal('forbidden');
      expect(tile.getEdges().e).to.equal('forbidden');
      expect(tile.getEdges().w).to.equal('forbidden');

      tile.setRotation(1);
      expect(tile.getEdges().w).to.equal('forest-path');

      tile.setRotation(2);
      expect(tile.getEdges().n).to.equal('forest-path');

      tile.setRotation(3);
      expect(tile.getEdges().e).to.equal('forest-path');
    });

    it('rotates clockwise', function() {
      let tile = Tile('forest-1');
      tile.rotateClockwise();
      expect(tile.getEdges().w).to.equal('forest-path');
    });

    it('rotates widdershins', function() {
      let tile = Tile('forest-1');
      tile.rotateWiddershins();
      expect(tile.getEdges().e).to.equal('forest-path');
    });
  });

  describe("getClientLayers()", function() {
    it('gets the client layers from the segment', function() {
      let tile = Tile('forest-2');
      tile.buildSegments();
      expect(tile.getClientLayers()[0].background).to.equal('tiles/forest-2.png')
    });
  })

});
