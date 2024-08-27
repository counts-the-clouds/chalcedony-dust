global.InventoryScrutinizer = (function() {

  function itemInInventory(condition) { return GameInventory.getItemCount(condition.code) > 0 }

  return Object.freeze({
    itemInInventory
  });

})();
