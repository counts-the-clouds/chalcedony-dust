global.HasItems = function(data = {}) {

  const $itemIDs = data.itemIDs || [];

  function getItems() {
    return $itemIDs.map(id => ItemDataStore.get(id));
  }

  function addItem(item) {
    const index = $itemIDs.indexOf(item.getID());
    if (index >= 0) { throw `${item} already in inventory.` }
    $itemIDs.push(item.getID());
  }

  function deleteItem(item) {
    const index = $itemIDs.indexOf(item.getID());
    if (index < 0) { throw `${item} is not in this inventory.` }
    $itemIDs.splice(index, 1);
  }

  // ===========================================================================

  function pack() {
    return {
      itemIDs: $itemIDs,
    };
  }

  function attach(model) {
    model.getItems = getItems;
    model.addItem = addItem;
    model.deleteItem = deleteItem;
  }

  return Object.freeze({
    pack,
    attach,
  });

}
