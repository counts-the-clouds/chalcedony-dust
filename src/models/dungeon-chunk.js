global.DungeonChunk = function(cx,cy) {

  const $cx = cx;
  const $cy = cy;
  const $cells = Array(_dungeonChunkSize * _dungeonChunkSize).fill(0);

  function getTileAt(coords) {
    let cell = $cells[coords.ci];
    return cell === 0 ? null : cell;
  }

  function setTileAt(coords, tile) {
    $cells[coords.ci] = tile;
    tile.setCoordinates(coords);
  }

  function setCell(i,tile) {
    $cells[i] = tile;
  }

  function pack() {
    return {
      cx: $cx,
      cy: $cy,
      cells: $cells.map(cell => { return (cell === 0) ? 0 : cell.pack() }),
    }
  }

  return Object.freeze({
    getTileAt,
    setTileAt,
    setCell,
    pack,
  });
}

DungeonChunk.unpack = function(data) {
  const chunk = DungeonChunk(data.cx, data.cy);

  for (let i=0; i<data.cells.length; i++) {
    if (data.cells[i] !== 0) {
      chunk.setCell(i,Tile.unpack(data.cells[i]));
    }
  }

  return chunk;
}
