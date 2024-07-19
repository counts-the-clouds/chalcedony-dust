describe("DungeonChunk", function() {

  describe("setTileAt()", function() {
    it("sets the tile and the tile's coordinates when set.", function() {
      let tile = Tile('forest-2');
      let chunk = new DungeonChunk(2,4);
      let coords = Coordinates.fromGlobal(10,8);

      chunk.setTileAt(coords,tile);

      let empty = chunk.getTileAt(Coordinates.fromGlobal(0,0));
      let placed = chunk.getTileAt(coords);

      expect(empty).to.equal(null);
      expect(placed.getCode()).to.equal('forest-2');
      expect(placed.getCoordinates().ci).to.equal(138);
    });
  });

});
