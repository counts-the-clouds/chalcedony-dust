global.Guardian = function(data) {

  const $code = data.code;
  const $id = data.id || GuardianDataStore.nextID();

  const $guardianData = GuardianRegistry.lookup($code);
  const $isActor = IsActor($guardianData);
  const $hasAspects = HasAspects(data.hasAspects);

  function getCode() { return $code; }
  function getID() { return $id; }

  // ===========================================================================

  function toString() {
    return `Guardian:${$id}[${$code}]`;
  }

  function pack() {
    return {
      code: $code,
      id: $id,
      hasAspects: $hasAspects.pack(),
    }
  }

  // ===========================================================================

  const $self = {
    model: 'Guardian',
    getCode,
    getID,
    toString,
    pack,
  };

  $isActor.attach($self);
  $hasAspects.attach($self);

  GuardianDataStore.store($self);

  return Object.freeze($self);
}
