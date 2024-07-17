global.Coordinates = (function() {
  let size = _dungeonChunkSize;

  function chunkID(cx,cy) { return `[${cx}|${cy}]`; }

  // This looks crazy I know, but chunk coordinates should always be a positive
  // number between 0 and 15. The global position (-1,-1) is really cell (15,15)
  // in chunk [-1|-1].
  //
  // To calculate a negative position, subtract the modded inverse value from the
  // chunk size to get the position within in chunk. This may be 16 (because 16-0
  // is 16), which is why there's an extra mod operation at the end there.

  function fromGlobal(gx, gy) {

    let translate = function(value) {
      return (value >= 0) ? (value % size) : (size - (-value % size)) % size;
    }

    let x = translate(gx);
    let y = translate(gy);

    let cx = Math.floor(gx / size);
    let cy = Math.floor(gy / size);

    return {
      chunkID: chunkID(cx,cy),
      gx: gx,
      gy: gy,
      cx: cx,
      cy: cy,
      ci: (size * y) + x
    };
  }

  // Given the chunk and the cell index within the chunk, return the global
  // position for that cell.
  function fromChunk(cx,cy,ci) {
    return {
      chunkID: chunkID(cx,cy),
      gx: (cx * size) + (ci % size),
      gy: (cy * size) + Math.floor(ci / size),
      cx: cx,
      cy: cy,
      ci: cy,
    }
  }

  return {
    fromGlobal,
    fromChunk,
  }

})();