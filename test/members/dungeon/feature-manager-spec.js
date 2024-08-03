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
    });

    it('joins a feature on a single tile', function() {
      const core = SpecHelper.placeTile(0,0,{ code:'dungeon-core' });
      const hall = SpecHelper.placeTile(0,1,{ code:'baseline-h2-0' });
      const feature = FeatureManager.featuresForTile(hall)[0];

      const tiles = Object.values(feature.getSegments()).map(segment => { return segment.getTile().getID() });
      const coreSegment = feature.getSegmentByTile(core,1);
      const hallSegment = feature.getSegmentByTile(hall,0);

      expect(tiles).to.have.members([core.getID(), hall.getID()]);
      expect(coreSegment.getConnection(_s).tile).to.equal(hall.getID());
      expect(hallSegment.getConnection(_n).tile).to.equal(core.getID());
    });

  });

});
