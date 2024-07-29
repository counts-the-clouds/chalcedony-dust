global.PlacementManager = (function () {

  let $placementRules;
  let $placementStatus;

  function startDrag() {
    const context = DragonDrop.getContext();
    const tile = context.tileContainer.getTile();

    $placementRules = tile.getPlacementRules();

    if (isPlaceOnOrigin()) {
      highlightOrigin();
    }
  }

  function tileRotated() {
    checkDropTarget();
  }

  // === Check Drop Target =====================================================

  function checkDropTarget() {
    $placementStatus = null;

    const hoverCell = DragonDrop.getHoverCell()
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
      n: DungeonView.getCellContainerAt(x,y - 1).getTile(),
      s: DungeonView.getCellContainerAt(x,y + 1).getTile(),
      e: DungeonView.getCellContainerAt(x + 1,y).getTile(),
      w: DungeonView.getCellContainerAt(x - 1,y).getTile(),
    }
  }

  function isLegal(home,neighbor) {
    // When the neighboring space is empty a tile can be placed there.
    if (neighbor == null) { return 'empty'; }
    if (neighbor == _stone && home == _stone) { return 'empty'; }

    // A forbidden edge can only be placed next to an empty space. Because the
    // neighboring tile is not null, neither tile can have a forbidden edge.
    if (home === _forbidden) { return 'no'; }
    if (neighbor === _forbidden) { return 'no'; }

    // An any edge can be placed next to any other edge.
    if (home === _any) { return 'yes'; }
    if (neighbor === _any) { return 'yes'; }

    // Otherwise the edges have to match.
    return (home === neighbor) ? 'yes' : 'no'
  }

  // For the placement to be legal there needs to be one edge that has a
  // positive 'yes' match. There cannot be any edges that have a negative 'no'
  // match.
  function allLegal() {
    const matches = Object.values($placementStatus)
    if (matches.indexOf('yes') == -1) { return false; }
    return matches.indexOf('no') === -1
  }

  // === Place Tile ============================================================

  function placeTile() {
    const coordinates = DragonDrop.getHoverCoordinates();
    const tile = DragonDrop.getContext().tileContainer.getTile();

    // The coordinates will be null if a player picked up a tile, but never
    // moved the mouse.
    if (coordinates && canPlaceTile(coordinates)) {
      GameController.placeTile(coordinates, tile)
    }
  }


  function canPlaceTile(coordinates) {
    if (isPlaceOnOrigin()) { return coordinates.gx === 0 && coordinates.gy === 0; }
    if ($placementStatus) { return $placementStatus.canPlace; }
    return false;
  }

  // === Highlighting ==========================================================

  function highlightOrigin() {
    OuterCellHighlight.show(0,0);
  }

  function highlightCell() {
    if ($placementStatus && $placementStatus.canPlace) {
      const hoverCell = DragonDrop.getHoverCell();

      InnerCellHighlight.show(hoverCell, $placementStatus);

    }
  }

  // ===========================================================================

  function isPlaceOnOrigin() {
    return ($placementRules||[]).includes(_placeOnOrigin);
  }

  function localLog(message, data) {
    log(message, { system:'PlacementManager', data:data });
  }

  return Object.freeze({
    startDrag,
    tileRotated,
    checkDropTarget,
    placeTile,
  });

})();