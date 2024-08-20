describe("Tile", function() {

  describe("Constructor", function() {
    it('builds segments', function() {
      const hall = Tile({ code:'baseline-h1-0' });
      const segments = hall.getSegments();

      expect(hall.getEdges().n).to.equal(TileType.hall);
      expect(segments[0].getIndex()).to.equal(0);
    });

    it('builds tile from segment data', function() {
      const tile = Tile({ segments:[
        { type:TileType.hall, exits:[_n], graphics:{ shape:'hall-medium' }},
      ]});

      expect(tile.getEdges().n).to.equal(TileType.hall);
    })
  });

  describe("Tile Rotation", function() {

    it('is not rotated by default', function() {
      expect(Tile({ code:'baseline-h1-0' }).getRotation()).to.equal(0);
    });

    it('throws on invalid rotations',function() {
      const tile = Tile({ code:'baseline-h1-n1-0' });
      expect(() => { tile.setRotation('zomg'); }).to.throw();
      expect(() => { tile.setRotation(-1); }).to.throw();
      expect(() => { tile.setRotation(5); }).to.throw();
    });

    it('setting rotation rotates tiles',function() {
      const tile = Tile({ code:'baseline-h2-r1-0' });

      expect(tile.getEdges().s).to.equal(TileType.stone);
      expect(tile.getEdges().n).to.equal(TileType.room);
      expect(tile.getEdges().e).to.equal(TileType.hall);
      expect(tile.getEdges().w).to.equal(TileType.hall);

      tile.setRotation(1);
      expect(tile.getEdges().e).to.equal(TileType.room);

      tile.setRotation(2);
      expect(tile.getEdges().s).to.equal(TileType.room);

      tile.setRotation(3);
      expect(tile.getEdges().w).to.equal(TileType.room);
    });

    it('rotates clockwise', function() {
      const tile = Tile({ code:'baseline-h1-0' });
      tile.rotateClockwise();
      expect(tile.getEdges().e).to.equal(TileType.hall);
    });

    it('rotates widdershins', function() {
      const tile = Tile({ code:'baseline-r1-0' });
      tile.rotateWiddershins();
      expect(tile.getEdges().w).to.equal(TileType.room);
    });
  });

  it('distanceToOrigin()', function() {
    const tile = SpecHelper.placeTile(5,10,{ code:'baseline-h2-n1-0' })
    expect(tile.distanceToOrigin()).to.equal(11);
  });

  describe('getNeighbors()', function() {
    it('gets neighboring tiles', function() {
      const core = SpecHelper.placeTile(0,0,{ code:'dungeon-core' });
      SpecHelper.placeTile( 0,-1,{ code:'baseline-h1-0', rotation:2 }); // N
      SpecHelper.placeTile( 0, 1,{ code:'baseline-h2-1', rotation:1 }); // S
      SpecHelper.placeTile( 1, 0,{ code:'baseline-r1-0', rotation:3 }); // E
      SpecHelper.placeTile(-1, 0,{ code:'baseline-r2-1', rotation:0 }); // W

      const neighbors = core.getNeighbors();
      expect(neighbors.n.getCode()).to.equal('baseline-h1-0');
      expect(neighbors.s.getCode()).to.equal('baseline-h2-1');
      expect(neighbors.e.getCode()).to.equal('baseline-r1-0');
      expect(neighbors.w.getCode()).to.equal('baseline-r2-1');
    });
  });

  describe("pack()", function() {

    it('with default tile', function() {
      const tile = Tile({ code:'baseline-r2-1' });
      const packed = tile.pack();

      expect(packed.id).to.equal(1);
      expect(packed.code).to.equal('baseline-r2-1');
    })

    it('with placement events', function() {
      const tile = Tile({ code:'baseline-r2-2', id:42, extra:{
        placementEvent:'fake-event',
        placementRules:[PlacementRules.noDiscard] }});
      tile.setCoordinates(Coordinates.fromGlobal(5,10));

      const packed = tile.pack();

      expect(Object.keys(packed).length).to.equal(7);
      expect(packed.id).to.equal(42);
      expect(packed.code).to.equal('baseline-r2-2');
      expect(packed.coordinates.gx).to.equal(5);
      expect(packed.coordinates.gy).to.equal(10);
      expect(packed.edges.e).to.equal(TileType.room);
      expect(packed.segments.length).to.equal(1);
      expect(packed.extra.placementEvent).to.equal('fake-event');
      expect(packed.extra.placementRules[0]).to.equal(PlacementRules.noDiscard);
      expect(packed.rotation).to.equal(0);
    });

    it('with note', function() {
      const packed = Tile({ code:'baseline-r3-0',
        extra: { drawNote:'tutorial.rotate-tile' }
      }).pack();

      expect(packed.extra.drawNote).to.equal('tutorial.rotate-tile');
    });
  });

  describe("unpack()", function() {
    it("with id", function() {
      const tile = Tile({
        code:'baseline-h2-r2-1',
        id: 42,
        coordinates: Coordinates.fromGlobal(5,10),
        rotation: 3,
      });

      expect(tile.getCode()).to.equal('baseline-h2-r2-1');
      expect(tile.getID()).to.equal(42);
      expect(tile.getCoordinates().ci).to.equal(165);
      expect(tile.getRotation()).to.equal(3);
    });

    it("with segments", function() {
      const tile = Tile({ code:'baseline-h3-n1-0' });
      const unpacked = Tile(tile.pack());
      const segment = unpacked.getSegments()[0];

      expect(unpacked.getEdges().n).to.equal(TileType.hall);
      expect(unpacked.getSegments().length).to.equal(4);
      expect(segment.getIndex()).to.equal(0);
    });
  });

});
