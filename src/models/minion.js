global.Minion = function(data) {

  const $id = data.id || MinionDataStore.nextID();

  const $isActor = IsActor(data.isActor);
  const $hasAspects = HasAspects(data.hasAspects);

  function getID() { return $id; }

  // ===========================================================================

  function toString() {
    return `Minion:${$id}[${$self.getSpecies().getName()}|${$self.getFullName()}]`
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
    model: 'Minion',
    getID,
    toString,
    pack,
  };

  $isActor.attach($self);
  $hasAspects.attach($self);

  MinionDataStore.store($self);

  return Object.freeze($self);
}
