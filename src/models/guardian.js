global.Guardian = function(data) {

  const $code = data.code;
  const $id = data.id || GuardianDataStore.nextID();

  const $guardianData = GuardianRegistry.lookup($code);
  const $isActor = IsActor($guardianData);
  const $hasAspects = HasAspects(data.hasAspects);

  function getCode() { return $code; }
  function getID() { return $id; }

  // TODO: I think the images and summon details can change over time. We'll
  //       need to have a way for the guardians to know what state they're in
  //       and summon details appropriate for that state. Images are similar in
  //       that they might change on the guardian state, but might also be
  //       needed to show different activities or emotions.
  //
  function getSummonImage() { return $guardianData.images.default; }
  function getSummonDetails() { return $guardianData.summonDetails.default; }

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
    getSummonImage,
    getSummonDetails,
    toString,
    pack,
  };

  $isActor.attach($self);
  $hasAspects.attach($self);

  GuardianDataStore.store($self);

  return Object.freeze($self);
}
