describe('BuriedTreasure', function() {

  function distantTile() {
    const tile = Tile({ code:'baseline-r2-0' });
    tile.setCoordinates(Coordinates.fromGlobal(10,10));
    return tile;
  }

  function nodeTile() {
    const tile = Tile({ code:'baseline-h2-n1-0' });
    tile.setCoordinates(Coordinates.fromGlobal(1,1));
    return tile;
  }

  it('addTreasures()', function() {
    BuriedTreasure.addTreasures('baseline-treasures');
    expect(BuriedTreasure.getTreasure('labrynthian-mine').type).to.equal(DiscoveryType.resource);
  });

  describe('removeTreasure()', function() {
    beforeEach(function() {
      BuriedTreasure.addTreasures('baseline-treasures');
      BuriedTreasure.setCount('labrynthian-mine',2)
    });

    it('reduces the count of a buried treasure', function() {
      BuriedTreasure.removeTreasure('labrynthian-mine');
      expect(BuriedTreasure.getTreasure('labrynthian-mine').count).to.equal(1);
    });

    it('removes a buried treasure when count reaches 0', function () {
      BuriedTreasure.removeTreasure('labrynthian-mine');
      BuriedTreasure.removeTreasure('labrynthian-mine');
      expect(BuriedTreasure.getTreasure('labrynthian-mine')).to.be.undefined;
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
      expect(BuriedTreasure.getHeat()).to.be.above(0);
    });

    it('returns a discovery and resets heat when a treasure is found', function() {
      const tile = Tile({ code:'baseline-r2-0' });
            tile.setCoordinates(Coordinates.fromGlobal(10,10));

      const discovery = BuriedTreasure.lookForTreasure(tile,0).code;

      expect(BuriedTreasure.getHeat()).to.equal(0);
      expect(discovery).to.be.oneOf(['coal-mine','labrynthian-mine','amberian-mine'])
    });
  });

  describe('getDiscoverableTreasures()', function() {
    it('returns discoveries within range of origin', function() {
      BuriedTreasure.addTreasures([
        { code:'labrynthian-mine', type:DiscoveryType.resource, distance:[0,null]},
        { code:'amberian-mine', type:DiscoveryType.resource, distance:[0,10]},
        { code:'draconian-mine', type:DiscoveryType.resource, distance:[10,20]},
        { code:'unobtanium-mine', type:DiscoveryType.resource, distance:[20,30]},
      ]);

      const list = BuriedTreasure.getDiscoverableTreasures(distantTile()).map(t => t.code);
      expect(list).to.have.members(['labrynthian-mine','draconian-mine']);
    });

    it("doesn't allow node tiles to have resource discoveries", function() {
      BuriedTreasure.addTreasures([
        { code:'labrynthian-mine', type:DiscoveryType.resource },
        { code:'cave-in', type:DiscoveryType.event },
      ]);

      const discoverable = BuriedTreasure.getDiscoverableTreasures(nodeTile());
      expect(discoverable.length).to.equal(1);
      expect(discoverable[0].code).to.equal('cave-in');
    });
  });

  it('sumAllWeight()', function() {
    const treasures = [
      { code:'labrynthian-mine', type:DiscoveryType.resource, weight:600 },
      { code:'amberian-mine', type:DiscoveryType.resource, weight:60 },
      { code:'draconian-mine', type:DiscoveryType.resource, weight:6 },
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
        { code:'amberian-mine', type:DiscoveryType.resource, count:3, distance:[20,30]},
      ]);

      GameFlags.set(SystemFlags.forceDiscovery,'amberian-mine')
      expect(BuriedTreasure.rollForTreasure(distantTile())).to.be.undefined;
    });

    it('returns the valid discovery given its code', function() {
      BuriedTreasure.addTreasures([
        { code:'amberian-mine', type:DiscoveryType.resource, count:3, distance:[10,20]},
      ]);

      GameFlags.set(SystemFlags.forceDiscovery,'amberian-mine')

      const discovery = BuriedTreasure.rollForTreasure(distantTile());
      expect(discovery.code).to.equal('amberian-mine');
      expect(BuriedTreasure.getTreasure('amberian-mine').count).to.equal(2);
    });

    it('returns a random discovery when set to true', function() {
      BuriedTreasure.addTreasures([
        { code:'labrynthian-mine', type:DiscoveryType.resource, count:3, weight:0 },
        { code:'amberian-mine', type:DiscoveryType.resource, count:3, weight:100 },
        { code:'draconian-mine', type:DiscoveryType.resource, count:3, weight:100 },
      ]);

      GameFlags.set(SystemFlags.forceDiscovery,true);

      const discovery = BuriedTreasure.rollForTreasure(distantTile());
      expect(discovery.code).to.be.oneOf(['draconian-mine','amberian-mine']);
      expect(BuriedTreasure.getTreasure(discovery.code).count).to.equal(2);
    });
  });

  describe('pack()', function() {
    it('serializes to JSON', function() {
      BuriedTreasure.addTreasures('baseline-treasures');
      BuriedTreasure.setHeat(69);

      const packed = BuriedTreasure.pack();
      expect(packed.heat).to.equal(69);
      expect(packed.treasures[0].code).to.equal('coal-mine');
    });
  });

});
