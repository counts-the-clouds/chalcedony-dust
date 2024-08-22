global.DungeonGrid = (function() {

  function build() {
    ensureChunk(Coordinates.fromChunk(0,0,0));
    ensureChunk(Coordinates.fromChunk(-1,0,0));
    ensureChunk(Coordinates.fromChunk(0,-1,0));
    ensureChunk(Coordinates.fromChunk(-1,-1,0));
  }

  function ensureChunk(coordinates) {
    if (ChunkDataStore.exists(coordinates.chunkID) === false) {
      const chunk = Chunk(coordinates);
      if (DungeonView.isVisible()) {
        DungeonView.addChunk(chunk);
      }
    }
  }

  function getTile(coords) {
    const chunk = ChunkDataStore.get(coords.chunkID);
    return chunk ? chunk.getTile(coords) : null;
  }

  function setTile(coords,tile) {
    ensureChunk(coords);
    ensureChunk(Coordinates.translate(coords, _n));
    ensureChunk(Coordinates.translate(coords, _s));
    ensureChunk(Coordinates.translate(coords, _e));
    ensureChunk(Coordinates.translate(coords, _w));

    ChunkDataStore.get(coords.chunkID).setTile(coords, tile);

    FeatureManager.tileAdded(tile);
  }

  return Object.freeze({
    build,
    getTile,
    setTile,
  });

})();
