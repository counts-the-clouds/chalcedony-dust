describe("TileBag", function() {

  it('reset(), isEmpty(), and size()', function() {
    TileBag.addSequentialTiles([ Tile({ code:'baseline-h2-0'}) ]);
    TileBag.addBaggedTiles({ 'baseline-h2-1':3 });
    TileBag.addWeightedTile( Tile({ code:'baseline-h2-2' }), 50, 10);
    TileBag.reset();

    expect(TileBag.size()).to.equal(0);
    expect(TileBag.isEmpty()).to.be.true;
  });

  it('addSequentialTiles()', function() {
    TileBag.addSequentialTiles([ Tile({ code:'baseline-h2-n1-0' }), Tile({ code:'baseline-h2-n1-1' }) ]);
    TileBag.addSequentialTiles([ Tile({ code:'baseline-h2-r1-0' }), Tile({ code:'baseline-h2-r1-1' }) ]);

    let codes = TileBag.pack().sequentialTiles.map(id => { return TileDataStore.get(id).getCode() });

    expect(codes).to.have.ordered.members([
      'baseline-h2-n1-0',
      'baseline-h2-n1-1',
      'baseline-h2-r1-0',
      'baseline-h2-r1-1',
    ]);
  })

  describe('addBaggedTiles()', function() {
    it("adds tiles", function() {
      TileBag.addBaggedTiles({ 'baseline-h2-r2-0':3, 'baseline-h2-r2-1':2 });

      let bag = TileBag.pack().baggedTiles;
      expect(bag['baseline-h2-r2-0']).to.equal(3)
      expect(bag['baseline-h2-r2-1']).to.equal(2)
    });

    it("appends tiles", function() {
      TileBag.addBaggedTiles({ 'baseline-h3-0':3, 'baseline-h3-1':2 });
      TileBag.addBaggedTiles({ 'baseline-h3-0':7, 'baseline-h3-2':1 });

      let bag = TileBag.pack().baggedTiles;
      expect(bag['baseline-h3-0']).to.equal(10)
      expect(bag['baseline-h3-1']).to.equal(2)
      expect(bag['baseline-h3-2']).to.equal(1)
    });
  });

  describe('removeBaggedTile()', function() {
    it("remove tiles", function() {
      TileBag.addBaggedTiles({ 'baseline-h3-n1-0':3, 'baseline-h3-n1-1':2 });
      TileBag.removeBaggedTile('baseline-h3-n1-1');
      expect(TileBag.pack().baggedTiles['baseline-h3-n1-1']).to.equal(1);
    });

    it ("deletes empty tiles", function() {
      TileBag.addBaggedTiles({ 'baseline-h3-r1-0':3, 'baseline-h4-0':1 });
      TileBag.removeBaggedTile('baseline-h4-0');
      expect(TileBag.pack().baggedTiles['baseline-h4-0']).to.be.undefined;
    });
  });

  it('addWeightedTile()', function() {
    const tile = Tile({ code:'baseline-h4-1' })

    TileBag.addWeightedTile(tile,50,10);

    const entry = TileBag.pack().weightedTiles['baseline-h4-1'];
    expect(entry.tileID).to.equal(tile.getID());
    expect(entry.chance).to.equal(50);
    expect(entry.heat).to.equal(10);
  });

  it('deleteWeightedTile()', function() {
    TileBag.addWeightedTile(Tile({ code:'baseline-h4-2' }),50,10);
    TileBag.deleteWeightedTile('baseline-h4-2');
    expect(TileBag.pack().weightedTiles['baseline-h4-2']).to.be.undefined;
  });

  describe('drawTile()', function() {
    it('draws with bagged tiles', function() {
      TileBag.addBaggedTiles({ 'baseline-h4-n1-0':3, 'baseline-h4-n1-1':1 });
      expect(TileBag.drawTile().getCode()).to.be.oneOf(['baseline-h4-n1-0','baseline-h4-n1-1']);
    });

    it('draws with sequential tiles', function() {
      TileBag.addBaggedTiles({ 'baseline-r1-0':30, 'baseline-r1-1':50 });
      TileBag.addSequentialTiles([ Tile({ code:'baseline-r1-2' }) ]);
      expect(TileBag.drawTile().getCode()).to.equal('baseline-r1-2');
    });

    it('draws with weighted tile', function() {
      TileBag.addBaggedTiles({ 'baseline-r2-0':3, 'baseline-r2-1':2 });
      TileBag.addWeightedTile( Tile({ code:'baseline-r2-2' }), 50, 10);
      expect(TileBag.drawTile().getCode()).to.be.oneOf(['baseline-r2-0','baseline-r2-1','baseline-r2-2']);
    });
  });

  describe('raiseHeat()', function() {
    it('raises heat', function() {
      TileBag.addWeightedTile( Tile({ code:'baseline-r1-n1-0' }), 50, 10);
      TileBag.raiseHeat();
      expect(TileBag.pack().weightedTiles['baseline-r1-n1-0'].chance).to.equal(60);
    })

    it('caps at 100', function() {
      TileBag.addWeightedTile(Tile({ code:'baseline-r2-3' }), 80, 70);
      TileBag.raiseHeat();
      expect(TileBag.pack().weightedTiles['baseline-r2-3'].chance).to.equal(100);
    });

    it('removes tile at 0', function() {
      TileBag.addWeightedTile(Tile({ code:'baseline-r2-n1-0' }), 10, -20);
      TileBag.raiseHeat();
      expect(TileBag.pack().weightedTiles['baseline-r2-n1-0']).to.be.undefined;
    });
  });

  it('unpack()', function() {
    TileBag.addBaggedTiles({ 'baseline-r3-0':30, 'baseline-r3-1':50 });
    TileBag.addWeightedTile(Tile({ code:'baseline-r3-n1-0' }), 50, 10);
    TileBag.addSequentialTiles([
      Tile({ code:'baseline-r4-0'}),
      Tile({ code:'baseline-r4-1'})
    ]);

    let data = TileBag.pack();

    TileBag.reset();
    TileBag.unpack(data);

    expect(TileBag.size()).to.equal(5)
    expect(TileBag.drawTile().getCode()).to.equal('baseline-r4-0');
  });

});
