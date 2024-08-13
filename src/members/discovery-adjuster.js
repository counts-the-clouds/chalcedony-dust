global.DiscoveryAdjuster = (function() {

  function adjustTile(tile,discovery) {
    console.log("=== Discovery Made ===")
    console.log(tile.toString(),'->',discovery)
  }

  return Object.freeze({
    adjustTile,
  });

})();