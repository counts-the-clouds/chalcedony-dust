global.GuardianNode = function(data) {

  const $id = data.id || GuardianNodeDataStore.nextID();
  const $featureID = data.featureID;
  const $guardianChoices = data.guardianChoices || randomlyPickGuardians();

  let $guardianID = data.guardianID;

  function getID() { return $id; }
  function getFeature() { return FeatureDataStore.get($featureID); }
  function setGuardian(guardian) { $guardianID = guardian.getID(); }
  function getGuardian() { return ($guardianID == null) ? null : GuardianDataStore.get($guardianID); }
  function getGuardianChoices() { return $guardianChoices; }

  function toString() {
    return `GuardianNode:${$id}`
  }

  function pack() {
    return {
      id: $id,
      guardianID: $guardianID,
      guardianChoices: $guardianChoices,
      featureID: $featureID,
    }
  }

  const $self = Object.freeze({
    model: 'Hall',
    getID,
    getFeature,
    setGuardian,
    getGuardian,
    getGuardianChoices,
    toString,
    pack,
  });

  GuardianNodeDataStore.store($self);

  return $self;
}

function randomlyPickGuardians() {
  const choices = Random.shuffle(WorldState.getAvailableGuardians());
  if (choices.length < 2) {
    throw `There aren't enough guardians to randomly pick from.`
  }

  return [choices[0], choices[1]];
}
