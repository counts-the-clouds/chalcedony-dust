describe('FeatureGraph', function() {

  beforeEach(clear);
  afterEach(clear);

  function clear() {
    DungeonGrid.clear();
    FeatureGraph.clear();
  }

  function placeTile(x,y,data) {
    DungeonGrid.setTile(Coordinates.fromGlobal(x,y),Tile(data));
  }

  describe('tileAdded()', function() {

    it('creates four features when the core tile is placed', function() {
      placeTile(0,0,{ code:'dungeon-core' });
    });

  });

})

