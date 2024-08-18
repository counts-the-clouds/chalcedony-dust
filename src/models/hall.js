global.Hall = function(data) {

  const $code = data.code;
  const $id = data.id || HallDataStore.nextID();

  function getCode() { return $code; }
  function getID() { return $id; }

  function toString() {
    return `Hall:${$id}[${$code}]`
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

  HallDataStore.store($self);

  return $self;
}
