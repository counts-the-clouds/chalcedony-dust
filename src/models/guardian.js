global.Guardian = function(data) {

  const $id = data.id || GuardianDataStore.nextID();
  const $isActor = IsActor(data.isActor);
  const $hasAspects = HasAspects(data.hasAspects);

  function getID() { return $id; }

  // ===========================================================================

  function toString() {
    return `Guardian:${$id}[${$self.getSpecies().getName()}|${$self.getFullName()}]`;
  }

  function pack() {
    return {
      id: $id,
      isActor: $isActor.pack(),
      hasAspects: $hasAspects.pack(),
    }
  }

  // ===========================================================================

  const $self = {
    model: 'Guardian',
    getID,
    toString,
    pack,
  };

  $isActor.attach($self);
  $hasAspects.attach($self);

  GuardianDataStore.store($self);

  return Object.freeze($self);
}
