global.PlacementManager = (function () {

  let $placementRules;
  let $edgeStatus;
  let $placementStatus;

  function startDrag() {
    const context = DragonDrop.getContext();
    const tile = context.tile;

    $placementRules = tile.getPlacementRules();
    $edgeStatus = null;

    if (isPlaceOnOrigin()) {
      highlightOrigin();
    }
  }

  function placeTile(context) {
    const hoverCell = DungeonView.getHoverCell();

    console.log("=== Drop ===")
    console.log("Drag Context:",context)
    console.log("Hover Cell:",hoverCell)
  }

  function isPlaceOnOrigin() {
    return ($placementRules||[]).includes(_placeOnOrigin);
  }
  
  function highlightOrigin() {
    TileHighlight.show(0,0);
  }

  return Object.freeze({
    startDrag,
    placeTile,
  });

})();