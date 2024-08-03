describe("Tile", function() {

  describe("Constructor", function() {
    it('builds segments', function() {
      const hall = Tile({ code:'baseline-h1-0' });
      console.log(hall.pack());
    });

    it('builds clock', function() {
      const core = Tile({ code:'dungeon-core' });
      console.log(core.pack());
    });
  });

  describe("Tile Rotation", function() {

    it('is not rotated by default', function() {
      expect(Tile({ code:'forest-1' }).getRotation()).to.equal(0);
    });

    it('throws on invalid rotations',function() {
      let tile = Tile({ code:'forest-2' });
      expect(() => { tile.setRotation('zomg'); }).to.throw();
      expect(() => { tile.setRotation(-1); }).to.throw();
      expect(() => { tile.setRotation(5); }).to.throw();
    });

    it('setting rotation rotates tiles',function() {
      let tile = Tile({ code:'baseline-h2-r1-0' });

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
      let tile = Tile({ code:'forest-1' });
      tile.rotateClockwise();
      expect(tile.getEdges().w).to.equal('forest-path');
    });

    it('rotates widdershins', function() {
      let tile = Tile({ code:'forest-1' });
      tile.rotateWiddershins();
      expect(tile.getEdges().e).to.equal('forest-path');
    });
  });

  describe('getNeighbors()', function() {
    it('gets neighboring tiles', function() {
      let core = SpecHelper.placeTile(0,0,{ code:'dungeon-core' });
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

  describe("getLayers()", function() {
    it('gets the client layers from the segment', function() {
      let tile = Tile({ code:'forest-2' });
      expect(tile.getLayers()[0].background).to.equal('f-2');
    });
  })

  describe("pack()", function() {

    it('with default tile', function() {
      let tile = Tile({ code:'forest-1' });
      let packed = tile.pack();

      expect(packed.id).to.be.above(100);
      expect(packed.code).to.equal('forest-1');
    })

    it('with placement events', function() {
      let tile = Tile({ code:'forest-2', id:42, extra:{
        placementEvent:'fake-event',
        placementRules:[_noDiscard] }});
      tile.setCoordinates(Coordinates.fromGlobal(5,10));

      let packed = tile.pack();

      let segment = packed.segments[0];
      expect(segment.index).to.equal(0);
      expect(segment.form).to.equal(_incomplete);

      expect(Object.keys(packed).length).to.equal(7);
      expect(packed.id).to.equal(42);
      expect(packed.code).to.equal('forest-2');
      expect(packed.coordinates.gx).to.equal(5);
      expect(packed.coordinates.gy).to.equal(10);
      expect(packed.edges.s).to.equal('forest-path');
      expect(packed.extra.placementEvent).to.equal('fake-event');
      expect(packed.extra.placementRules[0]).to.equal(_noDiscard);
      expect(packed.rotation).to.equal(0);
    });

    it('with note', function() {
      const packed = Tile({ code:'forest-2',
        extra: { drawNote:'tutorial.rotate-tile' }
      }).pack();

      expect(packed.extra.drawNote).to.equal('tutorial.rotate-tile');
    });

    it('with clock', function() {
      const packed = Tile({ code:'dungeon-core' }).pack();
      expect(packed.clock.code).to.equal('generate-tile');
      expect(packed.clock.elapsedTime).to.equal(0);
    });
  });

  describe("unpack()", function() {
    it("with id", function() {
      let tile = Tile({
        code:'forest-1',
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
      let tile = Tile({ code:'forest-2' });
      let unpacked = Tile(tile.pack());
      let segment = unpacked.getSegments()[0];

      expect(unpacked.getEdges().s).to.equal('forest-path');
      expect(unpacked.getSegments().length).to.equal(1);
      expect(segment.getIndex()).to.equal(0);
      expect(segment.getForm()).to.equal(_incomplete);
    });

    it("with clock", function() {
      const packed = Tile({ code:'dungeon-core' }).pack();
            packed.clock.elapsedTime = 30;

      const tile = Tile(packed);
      const clock = tile.getClock();

      expect(clock.getCode()).to.equal('generate-tile');
      expect(clock.getID()).to.equal(tile.getID());
      expect(clock.getElapsedTime()).to.equal(30);
    })
  });

});
