describe("TileShelf", function() {

  afterEach(function() {
    TileShelf.setSize(1);
    TileShelf.clear();
  });

  describe("addTile()", function() {
    it("Adds a tile to the shelf", function() {
      TileShelf.addTile(Tile('forest-1'));

      let packed = TileShelf.pack().shelf[0];
      expect(packed.code).to.equal('forest-1');
    });

    it("Throws an error if there is no room for the tile", function() {
      expect(()=> {
        TileShelf.addTile(Tile('forest-1'));
        TileShelf.addTile(Tile('forest-2'));
      }).to.throw("Cannot add tile")
    })

    it("Adds tile to the front of the array", function() {
      TileShelf.setSize(3);
      TileShelf.addTile(Tile('forest-1'));
      TileShelf.addTile(Tile('forest-2'));
      TileShelf.addTile(Tile('forest-3'));

      let codes = TileShelf.pack().shelf.map(tile => tile.code);
      expect(codes).to.have.ordered.members(['forest-3','forest-2','forest-1'])
    })
  });

  describe("removeTile()", function() {
    it("Removes a tile given it's position.", function() {
      TileShelf.setSize(3);
      TileShelf.addTile(Tile('forest-1', { id:101 }));
      TileShelf.addTile(Tile('forest-2', { id:102 }));
      TileShelf.addTile(Tile('forest-3', { id:103 }));
      TileShelf.removeTile(102);

      let codes = TileShelf.pack().shelf.map(tile => tile.code);
      expect(codes).to.have.ordered.members(['forest-3','forest-1'])
    });
  });

});