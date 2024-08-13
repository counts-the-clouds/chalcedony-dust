describe.only('BuriedTreasure', function() {

  it('addTreasures()', function() {
    BuriedTreasure.addTreasures('baseline-treasure');
    expect(BuriedTreasure.getTreasure('coal-mine').type).to.equal(_resource);
  });

  describe('lookForTreasure()', function() {

    beforeEach(function() {
      BuriedTreasure.addTreasures('baseline-treasure');
    });

    it('returns null and raises heat when nothing is found', function() {
      const tile = Tile({ code:'baseline-r2-0' });

      expect(BuriedTreasure.getHeat()).to.equal(0);
      expect(BuriedTreasure.lookForTreasure(tile, 100)).to.be.undefined;
      expect(BuriedTreasure.getHeat()).to.equal(3);
    });

    it('returns a discovery and resets heat when a treasure is found', function() {
      const tile = Tile({ code:'baseline-r2-0' });
            tile.setCoordinates(Coordinates.fromGlobal(5,5));

      const discovery = BuriedTreasure.lookForTreasure(tile,1);

      expect(BuriedTreasure.getHeat()).to.equal(0);
    });
  });

});