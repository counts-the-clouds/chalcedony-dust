global.InventoryWindow = (function() {

  let $slideWindow;

  function build() {
    $slideWindow = SlideWindow({ selector:'#inventoryWindow' });
    updateHeader();
    updateInventory();
  }

  function updateHeader() {
    const total = GameInventory.getStorage();

    if (total === 0) {
      return $slideWindow.setHeader(X.createElement(
        `<span class='inventory-state empty'>No Storerooms have been built</span>`
      ));
    }

    const free = GameInventory.getFreeStorage();
    const percentFull = Math.floor(free/total);

    $slideWindow.setHeader(X.createElement(
      `<span class='inventory-state ${getStatusClass(percentFull)}'>Storage ${total-free}/${total}</span>`
    ));
  }

  function getStatusClass(percentFull) {
    if (percentFull > 90) { return 'danger' }
    return (percentFull > 80) ? 'warning' : 'info'
  }

  function updateInventory() {
    if (GameInventory.getStorage() === 0) {
      return $slideWindow.setContent(X.createElement(
        `<div class='empty'>&nbsp;</div>`
      ));
    }
    if (GameInventory.isEmpty()) {
      return $slideWindow.setContent(X.createElement(
        `<div class='empty'>The dungeon's inventory is unforgivably empty.</div>`
      ));
    }
  }

  function reposition() { $slideWindow.reposition(); }

  return Object.freeze({
    build,
    reposition,
  });

})();