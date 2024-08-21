global.Item = function(data) {

  const $code = data.code;
  const $id = data.id || ItemDataStore.nextID();
  const $count = data.count || 1;

  function getCode() { return $code; }
  function getID() { return $id; }
  function getCount() { return $count; }

  function toString() {
    return `Item:${$id}[${$code}]`
  }

  function pack() {
    return {
      code: $code,
      id: $id,
      count: $count,
    }
  }

  const $self = Object.freeze({
    getID,
    getCode,
    getCount,
    toString,
    pack,
  });

  ItemDataStore.store($self);

  return $self;
}
