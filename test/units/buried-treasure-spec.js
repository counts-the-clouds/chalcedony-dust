describe('BuriedTreasure', function() {

  function distantTile() {
    const tile = Tile({ code:'baseline-r2-0' });
    tile.setCoordinates(Coordinates.fromGlobal(10,10));
    return tile;
  }

  it('addTreasures()', function() {
    BuriedTreasure.addTreasures('baseline-treasures');
    expect(BuriedTreasure.getTreasure('coal-mine').type).to.equal(_resource);
  });

  describe('removeTreasure()', function() {
    beforeEach(function() {
      BuriedTreasure.addTreasures('baseline-treasures');
      BuriedTreasure.setCount('coal-mine',2)
    });

    it('reduces the count of a buried treasure', function() {
      BuriedTreasure.removeTreasure('coal-mine');
      expect(BuriedTreasure.getTreasure('coal-mine').count).to.equal(1);
    });

    it('removes a buried treasure when count reaches 0', function () {
      BuriedTreasure.removeTreasure('coal-mine');
      BuriedTreasure.removeTreasure('coal-mine');
      expect(BuriedTreasure.getTreasure('coal-mine')).to.be.undefined;
    });
  });

  describe('lookForTreasure()', function() {

    beforeEach(function() {
      BuriedTreasure.addTreasures('baseline-treasures');
    });

    it('returns null and raises heat when nothing is found', function() {
      const tile = distantTile()

      expect(BuriedTreasure.getHeat()).to.equal(0);
      expect(BuriedTreasure.lookForTreasure(tile, 100)).to.be.undefined;
      expect(BuriedTreasure.getHeat()).to.equal(3);
    });

    it('returns a discovery and resets heat when a treasure is found', function() {
      const tile = Tile({ code:'baseline-r2-0' });
            tile.setCoordinates(Coordinates.fromGlobal(10,10));

      const discovery = BuriedTreasure.lookForTreasure(tile,1).code;

      expect(BuriedTreasure.getHeat()).to.equal(0);
      expect(discovery).to.be.oneOf(['coal-mine','iron-mine'])
    });
  });

  describe('getDiscoverableTreasures()', function() {
    it('returns discoveries within range of origin', function() {
      const tile = distantTile();
      BuriedTreasure.addTreasures([
        { code:'coal-mine', type:_resource, distance:[0,null]},
        { code:'iron-mine', type:_resource, distance:[0,10]},
        { code:'copper-mine', type:_resource, distance:[10,20]},
        { code:'silver-mine', type:_resource, distance:[20,30]},
      ])

      expect(BuriedTreasure.getDiscoverableTreasures(tile).map(t => t.code)).to.have.members(['coal-mine','copper-mine']);
    });
  });

  it('sumAllWeight()', function() {
    const treasures = [
      { code:'iron-mine', type:_resource, weight:600 },
      { code:'copper-mine', type:_resource, weight:60 },
      { code:'silver-mine', type:_resource, weight:6 },
    ];

    expect(BuriedTreasure.sumAllWeights(treasures)).to.equal(666);
  });

  it('Forbids Discovery', function() {
    BuriedTreasure.addTreasures('baseline-treasures');
    BuriedTreasure.setHeat(100);
    BuriedTreasure.forbidDiscovery();

    expect(BuriedTreasure.rollForTreasure(distantTile())).to.be.undefined;
  });

  describe('Forced Discovery', function() {
    it('when a discovery is invalid it reverts to standard (random) discovery', function() {
      BuriedTreasure.addTreasures([
        { code:'silver-mine', type:_resource, count:3, distance:[20,30]},
      ]);

      GameFlags.set(_forceDiscovery,'silver-mine')
      expect(BuriedTreasure.rollForTreasure(distantTile())).to.be.undefined;
    });

    it('returns the valid discovery given its code', function() {
      BuriedTreasure.addTreasures([
        { code:'silver-mine', type:_resource, count:3, distance:[10,20]},
      ]);

      GameFlags.set(_forceDiscovery,'silver-mine')

      const discovery = BuriedTreasure.rollForTreasure(distantTile());
      expect(discovery.code).to.equal('silver-mine');
      expect(BuriedTreasure.getTreasure('silver-mine').count).to.equal(2);
    });

    it('returns a random discovery when set to true', function() {
      BuriedTreasure.addTreasures([
        { code:'copper-mine', type:_resource, count:3, weight:0 },
        { code:'silver-mine', type:_resource, count:3, weight:100 },
        { code:'gold-mine', type:_resource, count:3, weight:100 },
      ]);

      GameFlags.set(_forceDiscovery,true);

      const discovery = BuriedTreasure.rollForTreasure(distantTile());
      expect(discovery.code).to.be.oneOf(['silver-mine','gold-mine']);
      expect(BuriedTreasure.getTreasure(discovery.code).count).to.equal(2);
    });
  });

});
