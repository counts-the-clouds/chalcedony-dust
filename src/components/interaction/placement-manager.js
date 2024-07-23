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

  function isPlaceOnOrigin() {
    return ($placementRules||[]).includes(_placeOnOrigin);
  }
  
  function highlightOrigin() {
    
  }

  return Object.freeze({
    startDrag,
  });

})();