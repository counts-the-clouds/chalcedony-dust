global.DungeonGrid = (function() {

  function build() {
    createChunk(Coordinates.fromChunk(0,0,0));
    createChunk(Coordinates.fromChunk(-1,0,0));
    createChunk(Coordinates.fromChunk(0,-1,0));
    createChunk(Coordinates.fromChunk(-1,-1,0));
  }

  function createChunk(coords) {
    if (ChunkDataStore.exists(coords.chunkID)) { throw `Chunk:${coords.chunkID} already exists.`; }
    return Chunk(coords);
  }

  function getTile(coords) {
    const chunk = ChunkDataStore.get(coords.chunkID);
    return chunk ? chunk.getTile(coords) : null;
  }

  function setTile(coords,tile) {
    const chunk = ChunkDataStore.get(coords.chunkID) || createChunk(coords);
          chunk.setTile(coords, tile);

    FeatureManager.tileAdded(tile);
  }

  return Object.freeze({
    build,
    getTile,
    setTile,
  });

})();
