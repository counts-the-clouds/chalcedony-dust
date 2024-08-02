describe('FeatureManager', function() {

  beforeEach(clear);
  afterEach(clear);

  function clear() {
    DungeonGrid.clear();
    FeatureManager.clear();
  }

  describe('tileAdded()', function() {

    it('creates four empty features when the core tile is placed', function() {
      const tile = SpecHelper.placeTile(0,0,{ code:'dungeon-core' });
      const features = FeatureManager.featuresForTile(tile);

      expect(features.length).to.equal(4);
      for (const feature of features) {
        expect(feature.getEdges().length).to.equal(0);
      }
    });

    it('joins a feature on a single tile', function() {
      const core = SpecHelper.placeTile(0,0,{ code:'dungeon-core' });
      const hall = SpecHelper.placeTile(1,0,{ code:'baseline-h2-0', rotate:1 });
    });

  });

})

