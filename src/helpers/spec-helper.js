global.SpecHelper = {

  placeTile: function(x,y,data) {
    const tile = Tile(data);
    DungeonGrid.setTile(Coordinates.fromGlobal(x,y),tile);
    return tile;
  },

  times: function(num, callback) {
    for (let i=0; i<num; i++) {
      callback(i);
    }
  },

  // TODO: These should have a UI component...
  startLog(header) { console.log(`=== ${header} ===`) },
  log(message) { console.log(message) },

};