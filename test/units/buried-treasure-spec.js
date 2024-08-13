describe('BuriedTreasure', function() {

  it('addTreasures()', function() {
    BuriedTreasure.addTreasures('baseline-treasures');
    expect(BuriedTreasure.getTreasure('coal-mine').type).to.equal(_resource);
  });

  describe('removeTreasure()', function() {
    beforeEach(function() {
      BuriedTreasure.addTreasures('baseline-treasures');
    });

    it('reduces the count of a buried treasure', function() {
      let i = BuriedTreasure.indexOfTreasure('coal-mine')
      BuriedTreasure.removeTreasure(i);
      expect(BuriedTreasure.getTreasure('coal-mine').count).to.equal(1);
    });

    it('removes a buried treasure when count reaches 0', function () {
      let i = BuriedTreasure.indexOfTreasure('coal-mine')
      BuriedTreasure.removeTreasure(i);
      BuriedTreasure.removeTreasure(i);
      expect(BuriedTreasure.getTreasure('coal-mine')).to.be.undefined;
    });
  });

  describe('lookForTreasure()', function() {

    beforeEach(function() {
      BuriedTreasure.addTreasures('baseline-treasures');
    });

    it('returns null and raises heat when nothing is found', function() {
      const tile = Tile({ code:'baseline-r2-0' });

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
      const tile = Tile({ code:'baseline-r2-0' });
            tile.setCoordinates(Coordinates.fromGlobal(10,10));

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

});
