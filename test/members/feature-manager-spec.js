describe('FeatureManager', function() {

  describe('tileAdded()', function() {
    it('creates four empty features when the core tile is placed', function() {
      const tile = SpecHelper.placeTile(0,0,{ code:'dungeon-core' });
      const features = tile.getFeatures();
      expect(features.length).to.equal(4);
    });

    it('joins a feature on a single tile', function() {
      const core = SpecHelper.placeTile(0,0,{ code:'dungeon-core' });
      const hall = SpecHelper.placeTile(0,1,{ code:'baseline-h2-1' });
      const feature = hall.getFeatures()[0];
      const tiles = feature.getSegments().map(segment => { return segment.getTile().getID() });
      expect(tiles).to.have.members([core.getID(), hall.getID()]);
    });

    it('merges two features when a tile is placed in the middle', function() {
      const core = SpecHelper.placeTile(0,0,{ code:'dungeon-core' });
      const h1 = SpecHelper.placeTile(0,2,{ code:'baseline-h2-0', rotation:1 });
      const h2 = SpecHelper.placeTile(0,1,{ code:'baseline-h2-0', rotation:1 });
      const feature = h1.getSegments()[0].getFeature();
      const tiles = feature.getTiles().map(tile => { return tile.getID() });

      expect(tiles).to.have.members([core.getID(), h1.getID(), h2.getID()]);
    });

    it('merges four features when a tile is placed in the middle', function() {
      SpecHelper.placeTile(0,-1,{ code:'baseline-h1-0', rotation:2 });
      SpecHelper.placeTile(0,1,{ code:'baseline-h1-0' });
      SpecHelper.placeTile(1,0,{ code:'baseline-h1-0', rotation:3 });
      SpecHelper.placeTile(-1,0,{ code:'baseline-h1-0', rotation:1 });

      const m = SpecHelper.placeTile(0,0,{ code:'baseline-h4-0' });
      const feature = m.getSegments()[0].getFeature();

      expect(feature.getSegments().length).to.equal(5);
      expect(FeatureDataStore.all().length).to.equal(1);
    });
  });

});
