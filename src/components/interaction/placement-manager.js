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

    // TODO: Hide any highlights or decorations here.

    const hoverCell = DragonDrop.getHoverCell()
    const neighbors = getNeighboringTiles(hoverCell.getCoordinates());
    const dragEdges = DragonDrop.getDragTile().getEdges();

    if (neighbors.n || neighbors.s || neighbors.e || neighbors.w) {
      console.log(`Check Drop Target -> ${DragonDrop.getContext().hoverCell}`);
      console.log('  Drag Edges',dragEdges)
      console.log('  Hover Cell Container',hoverCell);
      console.log('  Neighbors',neighbors);

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

    //   decorateEdges();
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

  function allLegal() {
    return $placementStatus.n !== 'no' &&
      $placementStatus.s !== 'no' &&
      $placementStatus.e !== 'no' &&
      $placementStatus.w !== 'no';
  }

  // === Place Tile ============================================================

  function placeTile() {
    try {
      const coordinates = DragonDrop.getHoverCoordinates();
      const tile = DragonDrop.getContext().tileContainer.getTile();

      // The coordinates will be null if a player picked up a tile, but never
      // moved the mouse.
      if (coordinates == null) { return false; }

      const placementData = {
        x: coordinates.gx,
        y: coordinates.gy,
        code: tile.getCode(),
        id: tile.getID()};

      if (canPlaceTile(coordinates)) {
        localLog("Place Tile",placementData);

        Note.clear();
        TileShelf.removeTile(tile.getID());
        TileShelfView.removeTile(tile);
        DungeonGrid.setCell(coordinates, tile);

        if (tile.getPlacementEvent()) {
          EventView.show(PagedEvent(tile.getPlacementEvent()))
        }

        if (TileBag.isSequence()) {
          GameController.drawTile();
        }

        DungeonView.placeTile(tile);
        executePlacementTrigger(tile);
      }
    }
    catch (error) {
      logError(`Error Placing Tile`,error,{
        system:'PlacementManager',
        data:placementData
      });
    }
  }

  function executePlacementTrigger(tile) {
    if (tile.placementTrigger) {
      try {
        localLog("Executing Placement Trigger", { code:tile.placementTrigger });
        TriggerRegistry.lookup(tile.placementTrigger).friggerFunction(tile);
      }
      catch(error) {
        logError(`Error Executing Placement Trigger`,error,{
          system:'PlacementManager',
          data:{ code:tile.placementTrigger }
        });
      }
    }
  }

  function canPlaceTile(coordinates) {
    if (isPlaceOnOrigin()) { return coordinates.gx === 0 && coordinates.gy === 0; }
    if ($placementStatus) { return $placementStatus.canPlace; }
    return false;
  }

  // ===========================================================================

  function isPlaceOnOrigin() {
    return ($placementRules||[]).includes(_placeOnOrigin);
  }

  function highlightOrigin() {
    TileHighlight.show(0,0);
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