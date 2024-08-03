describe("Chunk", function() {

  describe("setTile()", function() {
    it("sets the tile and the tile's coordinates when set.", function() {
      let tile = Tile({ code:'forest-2' });
      let chunk = Chunk(Coordinates.fromChunk(2,4,0));
      let coords = Coordinates.fromGlobal(10,8);

      chunk.setTile(coords,tile);

      let empty = chunk.getTile(Coordinates.fromGlobal(0,0));
      let placed = chunk.getTile(coords);

      expect(empty).to.equal(null);
      expect(placed.getCode()).to.equal('forest-2');
      expect(placed.getCoordinates().ci).to.equal(138);
    });
  });

});
