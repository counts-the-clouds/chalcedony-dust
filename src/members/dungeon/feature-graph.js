global.FeatureGraph = (function() {

  function clear() {

  }

  function tileAdded(tile) {
    if (tile.getCoordinates() == null) { throw 'A placed tile needs coordinates.' }

    const neighbors = tile.getNeighbors()

    console.log("Tile Added",tile)
    console.log('  neighbors',neighbors)
  }

  return Object.freeze({
    clear,
    tileAdded,
  })

})();
