global.Room = function(data) {

  const $code = data.code;
  const $id = data.id || RoomDataStore.nextID();

  function getCode() { return $code; }
  function getID() { return $id; }

  function toString() {
    return `Room:${$id}[${$code}]`
  }

  function pack() {
    return {
      code: $code,
      id: $id
    }
  }

  const $self = Object.freeze({
    getID,
    getCode,
    toString,
    pack,
  });

  RoomDataStore.store($self);

  return $self;
}
