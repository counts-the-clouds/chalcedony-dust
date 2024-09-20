global.GameInventory = (function() {

  let $storage;
  let $inventory;

  function reset() {
    $storage = 0;
    $inventory = {};
  }

  function setStorage(storage) { $storage = storage; }

  function addStorage(space) {
    $storage += space
    Panopticon.induce(EventType.storageExpanded,{ storage:$storage })
  }

  function getStorage() { return $storage; }
  function getFreeStorage() { return $storage - getUsedStorage(); }
  function getUsedStorage() { return Object.keys($inventory).length; }
  function isEmpty() { return getUsedStorage() === 0 }
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

    Panopticon.induce(EventType.itemAdded,{ code, count });
  }

  function removeItem(code, count) {
    if ($inventory[code] == null) { throw `Item:${code} is not in inventory.` }
    if ($inventory[code] < count) { throw `There is not enough Item:${code} in inventory.` }

    $inventory[code] -= count;

    if ($inventory[code] === 0) {
      delete $inventory[code];
    }

    Panopticon.induce(EventType.itemRemoved,{ code, count });
  }

  function withAspect(aspectCode) {
    let filtered = {};

    Object.keys($inventory).forEach(code => {
      if (Item(code).hasAspect(aspectCode)) {
        filtered[code] = $inventory[code];
      }
    });

    return filtered;
  }

  function getItemCount(code) { return $inventory[code] ? $inventory[code] : 0; }
  function getAll() { return {...$inventory}; }

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
    getUsedStorage,
    isEmpty,
    isFull,
    canAddItem,
    addItem,
    removeItem,
    withAspect,
    getItemCount,
    getAll,
    pack,
    unpack,
  })

})();