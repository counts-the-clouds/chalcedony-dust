global.PlacementManager = (function () {

  let $placementStatus;

  // === Check Drop Target =====================================================

  function checkDropTarget() {
    $placementStatus = null;

    const hoverCell = DragonDrop.getHoverCell();
    const neighbors = getNeighboringTiles(hoverCell.getCoordinates());
    const dragEdges = DragonDrop.getDragTile().getEdges();

    InnerCellHighlight.hide();

    if (neighbors.n || neighbors.s || neighbors.e || neighbors.w) {

      const nConnect = (neighbors.n) ? neighbors.n.getEdges().s : null;
      const sConnect = (neighbors.s) ? neighbors.s.getEdges().n : null;
      const eConnect = (neighbors.e) ? neighbors.e.getEdges().w : null;
      const wConnect = (neighbors.w) ? neighbors.w.getEdges().e : null;

      $placementStatus = {
        n: isLegal(dragEdges.n, nConnect),
        s: isLegal(dragEdges.s, sConnect),
        e: isLegal(dragEdges.e, eConnect),
        w: isLegal(dragEdges.w, wConnect),
      }

      $placementStatus.canPlace = allLegal();

      highlightCell();
    }
  }

  function getNeighboringTiles(coordinates) {
    const x = coordinates.gx;
    const y = coordinates.gy;

    return {
      n: DungeonView.getTileAt(x,y - 1),
      s: DungeonView.getTileAt(x,y + 1),
      e: DungeonView.getTileAt(x + 1,y),
      w: DungeonView.getTileAt(x - 1,y),
    }
  }

  function isLegal(home,neighbor) {
    // When the neighboring space is empty a tile can be placed there.
    if (neighbor == null) { return 'empty'; }

    // Even though stone matches against stone, it counts as an empty match,
    // meaning that even if the tile fits in the space, it's not a legal
    // placement because it would allow for disconnected areas.
    if (neighbor === TileType.stone && home === TileType.stone) { return 'empty'; }

    // A forbidden edge can only be placed next to an empty space. Because the
    // neighboring tile is not null, neither tile can have a forbidden edge.
    if (home === TileType.forbidden) { return 'no'; }
    if (neighbor === TileType.forbidden) { return 'no'; }

    // An any edge can be placed next to any other edge.
    if (home === TileType.any) { return 'yes'; }
    if (neighbor === TileType.any) { return 'yes'; }

    // Otherwise the edges have to match.
    return (home === neighbor) ? 'yes' : 'no'
  }

  // For the placement to be legal there needs to be one edge that has a
  // positive 'yes' match. There cannot be any edges that have a negative 'no'
  // match.
  function allLegal() {
    const matches = Object.values($placementStatus)
    if (matches.indexOf('yes') === -1) { return false; }
    return matches.indexOf('no') === -1
  }

  function highlightCell() {
    if ($placementStatus && $placementStatus.canPlace) {
      InnerCellHighlight.show(DragonDrop.getHoverCell(), $placementStatus);
    }
  }

  // === Place Tile ============================================================

  // TODO: The hover cell could also be null if we're placing a tile off of the
  //       edge of a chunk. We'll need to handle this earlier and build a new
  //       chunk when a tile is placed at the edge of the chunk extent.
  //
  async function placeTile() {
    const hoverCell = DragonDrop.getHoverCell();
    const coordinates = DragonDrop.getHoverCoordinates();
    const tile = DragonDrop.getDragTile();

    // The hoverCell will be null if a player picked up a tile, but never
    // moved the mouse.
    if (hoverCell == null) { return false; }
    if (hoverCell.getTile() != null) { return false; }

    if (canPlaceTile(coordinates)) {
      await GameController.placeTile(coordinates, tile)
    }
  }

  function canPlaceTile(coordinates) {
    if ($placementStatus) { return $placementStatus.canPlace; }
    return false;
  }

  return Object.freeze({
    checkDropTarget,
    placeTile,
  });

})();
