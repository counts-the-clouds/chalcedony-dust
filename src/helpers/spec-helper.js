global.SpecHelper = {

  placeTile: function(x,y,data) {
    const tile = Tile(data);
    DungeonGrid.setTile(Coordinates.fromGlobal(x,y),tile);
    return tile;
  }

};