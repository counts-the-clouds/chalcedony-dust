describe('FeatureManager', function() {

  beforeEach(clear);
  afterEach(clear);

  function clear() {
    DungeonGrid.clear();
    FeatureManager.clear();
  }

  function placeTile(x,y,data) {
    const tile = Tile(data);
    DungeonGrid.setTile(Coordinates.fromGlobal(x,y),tile);
    return tile;
  }

  describe.only('tileAdded()', function() {

    it('creates four empty features when the core tile is placed', function() {
      const tile = placeTile(0,0,{ code:'dungeon-core' });
      const features = FeatureManager.featuresForTile(tile);

      expect(features.length).to.equal(4);
      for (const feature of features) {
        expect(feature.getEdges().length).to.equal(0);
      }
    });

  });

})

