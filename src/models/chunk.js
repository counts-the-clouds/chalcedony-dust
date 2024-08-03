global.Chunk = function(coordinates, data={}) {

  const $id = coordinates.chunkID;
  const $cx = coordinates.cx;
  const $cy = coordinates.cy;

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
    return `Chunk:${id}`
  }

  function pack() {
    return {
      cx: $cx,
      cy: $cy,
      cells: $cells,
    }
  }

  // ===========================================================================

  const $self = Object.freeze({
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

