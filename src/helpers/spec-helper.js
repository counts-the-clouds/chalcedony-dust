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

  startLog(title) {
    X.first('#testLog').appendChild(X.createElement(`<h1>${title}</h1>`));
  },

  log(message) {
    X.first('#testLog').appendChild(X.createElement(`<p>${message}</p>`));
  },

};