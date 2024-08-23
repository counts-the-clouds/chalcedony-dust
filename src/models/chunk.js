global.Chunk = function(data) {

  // This is a little different from how the other models are built. A chunk
  // is built from the packed chunk data when it's loaded, but new chunks are
  // built from a coordinates object. Duck typing at its finest.
  const $id = data.chunkID
  const $cx = data.cx
  const $cy = data.cy

  const $cells = data.cells || Array(_chunkLength * _chunkLength).fill(0);

  // ===========================================================================

  function getID() { return $id; }

  function getChunkLocation() {
    return { x:$cx, y:$cy };
  }

  function getCells() {
    return [...$cells];
  }

  function getTile(coords) {
    let cellID = $cells[coords.ci];
    return cellID === 0 ? null : TileDataStore.get(cellID);
  }

  function setTile(coords, tile) {
    $cells[coords.ci] = tile.getID();
    tile.setCoordinates(coords);
  }

  function toString() {
    return `Chunk:${$id}`
  }

  function pack() {
    return {
      chunkID: $id,
      cx: $cx,
      cy: $cy,
      cells: $cells,
    }
  }

  // ===========================================================================

  const $self = Object.freeze({
    model: 'Chunk',
    getID,
    getChunkLocation,
    getCells,
    getTile,
    setTile,
    toString,
    pack,
  });

  ChunkDataStore.store($self);

  return $self;
}

