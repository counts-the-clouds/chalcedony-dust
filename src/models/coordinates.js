global.Coordinates = (function() {

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
      return (value >= 0) ? (value % _chunkLength) : (_chunkLength - (-value % _chunkLength)) % _chunkLength;
    }

    let x = translate(gx);
    let y = translate(gy);

    let cx = Math.floor(gx / _chunkLength);
    let cy = Math.floor(gy / _chunkLength);

    return {
      chunkID: chunkID(cx,cy),
      gx: gx,
      gy: gy,
      cx: cx,
      cy: cy,
      ci: (_chunkLength * y) + x
    };
  }

  // Given the chunk and the cell index within the chunk, return the global
  // position for that cell.
  function fromChunk(cx,cy,ci) {
    return {
      chunkID: chunkID(cx,cy),
      gx: (cx * _chunkLength) + (ci % _chunkLength),
      gy: (cy * _chunkLength) + Math.floor(ci / _chunkLength),
      cx: cx,
      cy: cy,
      ci: ci,
    }
  }

  return Object.freeze({
    fromGlobal,
    fromChunk,
  });

})();