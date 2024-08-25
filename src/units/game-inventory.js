global.GameInventory = (function() {

  let $storage;
  let $inventory;

  function reset() {
    $storage = 0;
    $inventory = {};
  }

  function setStorage(storage) { $storage = storage; }
  function addStorage(space) { $storage += space }
  function getStorage() { return $storage; }
  function getFreeStorage() { return $storage - Object.keys($inventory).length; }
  function isEmpty() { return Object.keys($inventory).length === 0 }
  function isFull() { return getFreeStorage() === 0 }
  function canAddItem(code) { return ($inventory[code] == null && isFull()) === false }

  function addItem(code, count) {
    if (canAddItem(code) === false) {
      throw `Cannot add Item:${code}. There is no free storage.`;
    }

    if ($inventory[code] == null) {
      $inventory[code] = 0;
    }
    $inventory[code] += count;
  }

  function removeItem(code, count) {
    if ($inventory[code] == null) { throw `Item:${code} is not in inventory.` }
    if ($inventory[code] < count) { throw `There is not enough Item:${code} in inventory.` }

    $inventory[code] -= count;

    if ($inventory[code] === 0) {
      delete $inventory[code];
    }
  }

  function getItemCount(code) {
    return $inventory[code] ? $inventory[code] : 0;
  }

  function pack() {
    return {
      storage: $storage,
      inventory: $inventory,
    }
  }

  function unpack(data) {
    $storage = data.storage;
    $inventory = data.inventory;
  }

  return Object.freeze({
    reset,
    setStorage,
    addStorage,
    getStorage,
    getFreeStorage,
    isEmpty,
    isFull,
    canAddItem,
    addItem,
    removeItem,
    getItemCount,
    pack,
    unpack,
  })

})();