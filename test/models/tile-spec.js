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
      let tile = Tile('baseline-h2-r1-0');
          tile.buildSegments();

      expect(tile.getEdges().s).to.equal(_stone);
      expect(tile.getEdges().n).to.equal(_room);
      expect(tile.getEdges().e).to.equal(_hall);
      expect(tile.getEdges().w).to.equal(_hall);

      tile.setRotation(1);
      expect(tile.getEdges().e).to.equal(_room);

      tile.setRotation(2);
      expect(tile.getEdges().s).to.equal(_room);

      tile.setRotation(3);
      expect(tile.getEdges().w).to.equal(_room);
    });

    it('rotates clockwise', function() {
      let tile = Tile('forest-1');
          tile.buildSegments();

      tile.rotateClockwise();
      expect(tile.getEdges().w).to.equal('forest-path');
    });

    it('rotates widdershins', function() {
      let tile = Tile('forest-1');
          tile.buildSegments();

      tile.rotateWiddershins();
      expect(tile.getEdges().e).to.equal('forest-path');
    });
  });

  describe("getLayers()", function() {
    it('gets the client layers from the segment', function() {
      let tile = Tile('forest-2');
      tile.buildSegments();
      expect(tile.getLayers()[0].background).to.equal('f-2');
    });
  })

  describe("pack()", function() {

    it('with default tile', function() {
      let tile = Tile('forest-1');
      let packed = tile.pack();

      expect(packed.id).to.be.above(100);
      expect(packed.code).to.equal('forest-1');
    })

    it('with placement events', function() {
      let tile = Tile('forest-1', { id:42, placementEvent:'fake-event', placementRules:[_noDiscard] });
          tile.buildSegments();
          tile.setCoordinates(Coordinates.fromGlobal(5,10));

      let packed = tile.pack();

      let segment = packed.segments[0];
      expect(segment.index).to.equal(0);
      expect(segment.form).to.equal(_incomplete);

      expect(Object.keys(packed).length).to.equal(11);
      expect(packed.id).to.equal(42);
      expect(packed.code).to.equal('forest-1');
      expect(packed.coordinates.gx).to.equal(5);
      expect(packed.coordinates.gy).to.equal(10);
      expect(packed.edges.s).to.equal('forest-path');
      expect(packed.placementEvent).to.equal('fake-event');
      expect(packed.placementRules[0]).to.equal(_noDiscard);
      expect(packed.rotation).to.equal(0);
    });

    it('with note', function() {
      let tile = Tile('forest-2', { drawNote:'tutorial.rotate-tile' });
      expect(tile.pack().drawNote).to.equal('tutorial.rotate-tile');
    });
  });

  describe("unpack()", function() {
    it("with id", function() {
      let tile = Tile.unpack({
        code: 'forest-1',
        id: 42,
        coordinates: Coordinates.fromGlobal(5,10),
        rotation: 3,
      });

      expect(tile.getCode()).to.equal('forest-1');
      expect(tile.getID()).to.equal(42);
      expect(tile.getCoordinates().ci).to.equal(165);
      expect(tile.getRotation()).to.equal(3);
    });

    it("with segments", function() {
      let tile = Tile('forest-2');
          tile.buildSegments();

      let unpacked = Tile.unpack(tile.pack());
      let segment = unpacked.getSegments()[0];

      expect(unpacked.getEdges().s).to.equal('forest-path');
      expect(unpacked.getSegments().length).to.equal(1);
      expect(segment.getIndex()).to.equal(0);
      expect(segment.getForm()).to.equal(_incomplete);
    });
  });

});
