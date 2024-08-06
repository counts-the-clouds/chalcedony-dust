global.TileShelf = (function() {

  let $size;
  let $shelf;

  function reset() {
    $size = 1;
    $shelf = [];
  }

  function setSize(size) { $size = size; }
  function getSize() { return $size; }

  function addTile(tile) {
    if (getEmptySpaceCount() === 0) { throw `Cannot add tile, there is no room on the shelf.` }
    $shelf.unshift(tile);
  }

  function getShelf() { return [...$shelf]; }
  function hasTile(id) { return getTileIndex(id) >= 0; }
  function getTile(id) { return $shelf[getTileIndex(id)]; }
  function removeTile(id) { $shelf.splice(getTileIndex(id), 1); }
  function getEmptySpaceCount() { return $size - $shelf.length }

  function getTileIndex(id) {
    let index = ArrayHelper.find($shelf, tile => {
      return tile.getID() === id;
    });

    return (index == null) ? -1 : index;
  }

  function discardLastTile() {
    if ($shelf.length > 0) {
      const lastTile = $shelf[$shelf.length-1];
      $shelf.splice($shelf.length-1, 1);
      return lastTile;
    }
  }

  // We pack the tile shelf when saving and loading the game.
  function pack() {
    return {
      size: $size,
      shelf: $shelf.map(tile => { return tile.pack(); }),
    };
  }

  function unpack(data) {
    $size = data.size;
    $shelf = data.shelf;
  }

  return Object.freeze({
    reset,
    setSize,
    getSize,
    getShelf,
    addTile,
    hasTile,
    getTile,
    removeTile,
    getEmptySpaceCount,
    discardLastTile,
    pack,
    unpack
  });

})();