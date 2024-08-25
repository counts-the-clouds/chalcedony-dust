global.InventoryWindow = (function() {

  let $slideWindow;

  function build() {
    $slideWindow = SlideWindow({ selector:'#inventoryWindow' });
    updateHeader();
    updateInventory();

    Panopticon.addObserver(Observer(EventType.storageExpanded, () => { updateHeader(); }));

    Panopticon.addObserver(Observer(EventType.itemAdded, (data) => {
      updateHeader();
      updateInventory(data);
    }));

    Panopticon.addObserver(Observer(EventType.itemRemoved, (data) => {
      updateHeader();
      updateInventory(data);
    }));
  }

  function updateHeader() {
    const total = GameInventory.getStorage();

    if (total === 0) {
      return $slideWindow.setHeader(X.createElement(
        `<span class='inventory-state empty'>No Storerooms have been built</span>`
      ));
    }

    const free = GameInventory.getFreeStorage();
    const used = GameInventory.getUsedStorage();
    const percentFull = Math.floor(free/total);

    $slideWindow.setHeader(X.createElement(
      `<span class='inventory-state ${getStatusClass(percentFull)}'>Storage ${used}/${total}</span>`
    ));
  }

  function getStatusClass(percentFull) {
    if (percentFull > 90) { return 'danger' }
    return (percentFull > 80) ? 'warning' : 'info'
  }

  function updateInventory(data) {
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

    const slideContent = $slideWindow.getContent();
    const itemList = slideContent.querySelector('ul.item-list');
    const listItems = itemList ? itemList.querySelectorAll('li') : null;
    const itemCount = listItems ? listItems.length : 0;

    if (data == null || itemList == null || itemCount !== GameInventory.getUsedStorage()) {
      return rebuildItemList();
    }

    updateItemQuantity(itemList, data);
  }

  function rebuildItemList() {
    let itemList = `<ul class='item-list'>`

    Object.keys(GameInventory.getAll()).toSorted().forEach(code => {
      const item = ItemRegistry.lookup(code);
      const count = GameInventory.getItemCount(code);

      itemList += `<li class='inventory-item'>
        <div class='icon icon-for-${code}'></div>
        <div class='name'>${item.name}</div>
        <div class='count'>${count}</div>
      </li>`
    });

    $slideWindow.setContent(X.createElement(`${itemList}</ul>`));
    $slideWindow.resize();
    $slideWindow.reposition();
  }

  function updateItemQuantity(itemList, data) {
    console.log("TODO: Update quantity with ",data);
  }

  function reposition() { $slideWindow.reposition(); }

  return Object.freeze({
    build,
    reposition,
  });

})();