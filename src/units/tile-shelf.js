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
    $shelf.unshift(tile.getID());
  }

  function getShelf() { return [...$shelf]; }
  function hasTile(id) { return $shelf.includes(id); }
  function removeTile(id) { $shelf.splice($shelf.indexOf(id), 1); }
  function getEmptySpaceCount() { return $size - $shelf.length }

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
      shelf: $shelf,
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
    removeTile,
    getEmptySpaceCount,
    discardLastTile,
    pack,
    unpack
  });

})();