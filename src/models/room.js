global.Room = function(data) {

  const $code = data.code;
  const $id = data.id || RoomDataStore.nextID();
  const $hasItems = HasItems(data.hasItems);

  function getCode() { return $code; }
  function getID() { return $id; }

  // ===========================================================================

  function toString() {
    return `Room:${$id}[${$code}]`
  }

  function pack() {
    return {
      code: $code,
      id: $id,
      hasItems: $hasItems.pack(),
    }
  }

  // ===========================================================================

  const $self = {
    getID,
    getCode,
    toString,
    pack,
  };

  $hasItems.attach($self);

  RoomDataStore.store($self);

  return Object.freeze($self);
}
