describe("TileBag", function() {

  beforeEach(TileBag.empty);
  afterEach(TileBag.empty);

  function startSequence() {
    TileBag.startSequence({ background:'/tile-bag/forest-path-sequence.png' });
  }

  it('empty(), isEmpty(), and size()', function() {
    startSequence();
    TileBag.addSequentialTiles([ Tile({ code:'forest-1'}) ]);
    TileBag.addBaggedTiles({ 'forest-1':3 });
    TileBag.addWeightedTile( Tile({ code:'forest-3' }), 50, 10);
    TileBag.empty();

    expect(TileBag.size()).to.equal(0);
    expect(TileBag.isEmpty()).to.be.true;
  });

  it('addSequentialTiles()', function() {
    startSequence();
    TileBag.addSequentialTiles([ Tile({ code:'forest-1' }), Tile({ code:'forest-2' }) ]);
    TileBag.addSequentialTiles([ Tile({ code:'forest-2' }), Tile({ code:'forest-1' }) ]);

    let codes = TileBag.pack().sequenceData.tiles.map(tile => { return tile.code });

    expect(codes).to.have.ordered.members([
      'forest-1',
      'forest-2',
      'forest-2',
      'forest-1'
    ]);
  })

  describe('addBaggedTiles()', function() {
    it("adds tiles", function() {
      TileBag.addBaggedTiles({ 'forest-1':3, 'forest-2':2 });

      let bag = TileBag.pack().baggedTiles;
      expect(bag['forest-1']).to.equal(3)
      expect(bag['forest-2']).to.equal(2)
    });

    it("appends tiles", function() {
      TileBag.addBaggedTiles({ 'forest-1':3, 'forest-2':2 });
      TileBag.addBaggedTiles({ 'forest-1':7, 'forest-3':1 });

      let bag = TileBag.pack().baggedTiles;
      expect(bag['forest-1']).to.equal(10)
      expect(bag['forest-2']).to.equal(2)
      expect(bag['forest-3']).to.equal(1)
    });
  });

  describe('removeBaggedTile()', function() {
    it("remove tiles", function() {
      TileBag.addBaggedTiles({ 'forest-1':3, 'forest-2':2 });
      TileBag.removeBaggedTile('forest-2');
      expect(TileBag.pack().baggedTiles['forest-2']).to.equal(1);
    });

    it ("deletes empty tiles", function() {
      TileBag.addBaggedTiles({ 'forest-1':3, 'forest-2':1 });
      TileBag.removeBaggedTile('forest-2');
      expect(TileBag.pack().baggedTiles['forest-2']).to.be.undefined;
    });
  });

  it('addWeightedTile()', function() {
    TileBag.addWeightedTile(Tile({ code:'forest-3' }),50,10);

    let entry = TileBag.pack().weightedTiles['forest-3'];
    expect(entry.tile.code).to.equal('forest-3');
    expect(entry.chance).to.equal(50);
    expect(entry.heat).to.equal(10);
  });

  it('deleteWeightedTile()', function() {
    TileBag.addWeightedTile(Tile({ code:'forest-3' }),50,10);
    TileBag.deleteWeightedTile('forest-3');
    expect(TileBag.pack().weightedTiles['forest-3']).to.be.undefined;
  });

  describe('drawTile()', function() {
    it('draws with bagged tiles', function() {
      TileBag.addBaggedTiles({ 'forest-1':3, 'forest-2':1 });
      expect(TileBag.drawTile().getCode()).to.be.oneOf(['forest-1','forest-2']);
    });

    it('draws with sequential tiles', function() {
      startSequence();
      TileBag.addBaggedTiles({ 'forest-1':30, 'forest-2':50 });
      TileBag.addSequentialTiles([ Tile({ code:'forest-3' }) ]);
      expect(TileBag.drawTile().getCode()).to.equal('forest-3');
    });

    it('draws with weighted tile', function() {
      TileBag.addBaggedTiles({ 'forest-1':3, 'forest-2':2 });
      TileBag.addWeightedTile( Tile({ code:'forest-3' }), 50, 10);
      expect(TileBag.drawTile().getCode()).to.be.oneOf(['forest-1','forest-2','forest-3']);
    });
  });

  describe('raiseHeat()', function() {
    it('raises heat', function() {
      TileBag.addWeightedTile( Tile({ code:'forest-3' }), 50, 10);
      TileBag.raiseHeat();
      expect(TileBag.pack().weightedTiles['forest-3'].chance).to.equal(60);
    })

    it('caps at 100', function() {
      TileBag.addWeightedTile(Tile({ code:'forest-3' }), 80, 70);
      TileBag.raiseHeat();
      expect(TileBag.pack().weightedTiles['forest-3'].chance).to.equal(100);
    });

    it('removes tile at 0', function() {
      TileBag.addWeightedTile(Tile({ code:'forest-3' }), 10, -20);
      TileBag.raiseHeat();
      expect(TileBag.pack().weightedTiles['forest-3']).to.be.undefined;
    });
  });

  it('unpack()', function() {
    startSequence();
    TileBag.addBaggedTiles({ 'forest-1':30, 'forest-2':50 });
    TileBag.addWeightedTile(Tile({ code:'forest-3' }), 50, 10);
    TileBag.addSequentialTiles([
      Tile({ code:'forest-1'}),
      Tile({ code:'forest-2'})
    ]);

    let data = TileBag.pack();

    TileBag.empty();
    TileBag.unpack(data);

    expect(TileBag.size()).to.equal(5)
    expect(TileBag.drawTile().getCode()).to.equal('forest-1');
  });

});