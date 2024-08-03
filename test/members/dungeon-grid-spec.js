describe("DungeonGrid", function() {

  describe("getTile()", function() {
    it("when chunk is empty", function() {
      const tile = DungeonGrid.getTile(Coordinates.fromGlobal(150,75));
      expect(tile).to.equal(null)
    });

    it("when cell is empty", function() {
      const tile = DungeonGrid.getTile(Coordinates.fromGlobal(5,15));
      expect(tile).to.equal(null)
    });

    it("when cell has a value", function() {
      const coords = Coordinates.fromGlobal(5,15);
      DungeonGrid.setTile(coords, Tile({ code:'forest-1'}));

      const tile = DungeonGrid.getTile(coords);
      expect(tile.getCode()).to.equal('forest-1');
    });
  });

  describe("setTile()", function() {
    it('creates a new chunk if needed', function() {
      const coords = Coordinates.fromGlobal(150,75);
      DungeonGrid.setTile(coords, Tile({ code:'baseline-h2-1' }));
      expect(DungeonGrid.getTile(coords).getCode()).to.equal('baseline-h2-1');
    });
  });

});