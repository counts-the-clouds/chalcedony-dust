global.Adventurer = function(data) {

  const $id = data.id || AdventurerDataStore.nextID();
  const $isActor = IsActor(data.isActor);
  const $hasAspects = HasAspects(data.hasAspects);

  function getID() { return $id; }

  // ===========================================================================

  function toString() {
    return `Adventurer:${$id}[${getFullName()}]`
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
    model: 'Adventurer',
    getID,
    toString,
    pack,
  };

  $isActor.attach($self);
  $hasAspects.attach($self);

  AdventurerDataStore.store($self);

  return Object.freeze($self);
}
