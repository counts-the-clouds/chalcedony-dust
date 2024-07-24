global.PlacementManager = (function () {

  let $placementRules;
  let $edgeStatus;
  let $placementStatus;

  function startDrag() {
    const context = DragonDrop.getContext();
    const tile = context.tileContainer.getTile();

    $placementRules = tile.getPlacementRules();
    $edgeStatus = null;

    if (isPlaceOnOrigin()) {
      highlightOrigin();
    }
  }



  // We don't want to build the $edgeStatus object every time we drag a tile
  // over the dungeon. When a tile is rotated though it's edges change, so we
  // need to set it to null so that it will be rebuilt.
  function tileRotated() {
    $edgeStatus = null;
    checkDropTarget();
  }

  function checkDropTarget() {
    console.log(` -> ${DragonDrop.getContext().hoverCell}`)
  }

  function placeTile() {
    try {
      const cellContainer = DragonDrop.getHoverCell();
      const coordinates = DragonDrop.getHoverCoordinates();
      const tile = DragonDrop.getContext().tileContainer.getTile();

      const placementData = {
        x: coordinates.gx,
        y: coordinates.gy,
        code: tile.getCode(),
        id: tile.getID() };

      if (canPlaceTile(coordinates)) {
        localLog("Place Tile",placementData);

        Note.clear();
        TileShelf.removeTile(tile.getID());
        TileShelfContainer.removeTile(tile);
        DungeonGrid.setCell(coordinates, tile);

        if (tile.getPlacementEvent()) {
          console.log("Trigger Event",tile.getPlacementEvent());
          // EventManager.triggerEvent(tile.getPlacementEvent());
        }

        if (TileBag.isSequence()) {
          TileBag.pushTile();
        }

        // returns tile at dungeon grid, and tile shelf...
        // DungeonGridComponent.placeTile(response.tile);
        // executePlacementTrigger(response.tile);
      }
    }
    catch (error) {
      logError(`Error Placing Tile`,error,{ system:'PlacementManager', data:this.placementData });
    }
  }

  function canPlaceTile(coordinates) {
    if (isPlaceOnOrigin()) { return coordinates.gx === 0 && coordinates.gy === 0; }
    if ($placementStatus) { return $placementStatus.canPlace; }
    return false;
  }

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