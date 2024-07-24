global.DungeonGrid = (function() {

  let $chunks;

  // When we clear the DungeonGrid we always add empty chunks around the origin
  // cell.
  function clear() {
    $chunks = {}
    createChunk(Coordinates.fromChunk(0,0,0));
    createChunk(Coordinates.fromChunk(-1,0,0));
    createChunk(Coordinates.fromChunk(0,-1,0));
    createChunk(Coordinates.fromChunk(-1,-1,0));
  }

  function getChunks() { return { ...$chunks }; }
  function getChunk(chunkID) { return $chunks[chunkID]; }

  function getCell(coords) {
    return $chunks[coords.chunkID] ? $chunks[coords.chunkID].getTileAt(coords) : null
  }

  function setCell(coords,tile) {
    if ($chunks[coords.chunkID] == null) {
      createChunk(coords);
    }

    $chunks[coords.chunkID].setTileAt(coords, tile);
  }

  function createChunk(coords) {
    if ($chunks[coords.chunkID] != null) { throw `DungeonChunk(${coords.chunkID}) already exists.`; }
    $chunks[coords.chunkID] = new DungeonChunk(coords.cx,coords.cy);
  }

  function pack() {
    let data = { chunks:{} };

    Object.keys($chunks).forEach(id => {
      data.chunks[id] = $chunks[id].pack();
    })

    return data;
  }

  function unpack(data) {
    console.log("TODO: DungeonGrid.unpack()",data);
  }

  return Object.freeze({
    clear,
    getChunks,
    getChunk,
    getCell,
    setCell,
    pack,
    unpack,
  });

})();
