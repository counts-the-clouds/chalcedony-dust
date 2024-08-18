global.Resource = function(data) {

  const $code = data.code;
  const $id = data.id || ResourceDataStore.nextID();

  function getCode() { return $code; }
  function getID() { return $id; }

  console.log("Built A Resource:",toString());

  function toString() {
    return `Resource:${$id}[${$code}]`
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

  ResourceDataStore.store($self);

  return $self;
}
