describe('FeatureManager', function() {

  describe('tileAdded()', function() {
    it('creates four empty features when the core tile is placed', function() {
      const tile = SpecHelper.placeTile(0,0,{ code:'dungeon-core' });
      const features = tile.getFeatures();
      expect(features.length).to.equal(4);
    });

    it('joins a feature on a single tile', function() {
      const core = SpecHelper.placeTile(0,0,{ code:'dungeon-core' });
      const hall = SpecHelper.placeTile(0,1,{ code:'baseline-h2-0' });
      const feature = hall.getFeatures()[0];
      const tiles = Object.values(feature.getSegments()).map(segment => { return segment.getTile().getID() });
      expect(tiles).to.have.members([core.getID(), hall.getID()]);
    });
  });

});
