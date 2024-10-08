describe("TileShelf", function() {

  describe("addTile()", function() {
    it("Adds a tile to the shelf", function() {
      TileShelf.addTile(Tile({ code:'baseline-r1-0', id:666 }));
      expect(TileShelf.getShelf()[0]).to.equal(666);
    });

    it("Throws an error if there is no room for the tile", function() {
      expect(()=> {
        TileShelf.addTile(Tile({ code:'baseline-r1-1' }));
        TileShelf.addTile(Tile({ code:'baseline-r1-2' }));
      }).to.throw("Cannot add tile")
    })

    it("Adds tile to the front of the array", function() {
      TileShelf.setSize(3);
      TileShelf.addTile(Tile({ code:'baseline-r1-0', id:11 }));
      TileShelf.addTile(Tile({ code:'baseline-r1-1', id:12 }));
      TileShelf.addTile(Tile({ code:'baseline-r1-2', id:13 }));

      const ids = TileShelf.getShelf();
      expect(ids).to.have.ordered.members([13,12,11]);
    })
  });

  describe("removeTile()", function() {
    it("Removes a tile given its ID.", function() {
      TileShelf.setSize(3);
      TileShelf.addTile(Tile({ code:'baseline-r1-0', id:11 }));
      TileShelf.addTile(Tile({ code:'baseline-r1-1', id:12 }));
      TileShelf.addTile(Tile({ code:'baseline-r1-2', id:13 }));
      TileShelf.removeTile(12);

      const ids = TileShelf.getShelf();
      expect(ids).to.have.ordered.members([13,11])
    });
  });

  describe("discardLastTile()", function() {
    it("does nothing when empty", function() {
      TileShelf.discardLastTile();
      expect(TileShelf.getEmptySpaceCount()).to.equal(1);
    });

    it("discards the last tile on the shelf", function() {
      TileShelf.setSize(3);
      TileShelf.addTile(Tile({ code:'baseline-r1-0', id:101 }));
      TileShelf.addTile(Tile({ code:'baseline-r1-1', id:102 }));
      TileShelf.addTile(Tile({ code:'baseline-r1-2', id:103 }));

      const lastTile = TileShelf.discardLastTile();
      const ids = TileShelf.getShelf();

      expect(lastTile).to.equal(101);
      expect(ids).to.have.ordered.members([103,102]);
    });
  });

});