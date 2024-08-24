global.Aspect = function(data) {

  const $code = data.code;
  const $id = data.id || AspectDataStore.nextID();

  let $level = data.level || 1;
  let $experience = data.experience || 0;

  function getCode() { return $code; }
  function getID() { return $id; }
  function setLevel(level) { $level = level; }
  function getLevel() { return $level; }
  function setExperience(xp) { $experience = xp; }
  function getExperience() { return $level; }

  function toString() {
    return `Aspect:${$id}[${$code}|${$level}]`
  }

  function pack() {
    return {
      code: $code,
      id: $id,
      level: $level,
      experience: $experience,
    }
  }

  const $self = Object.freeze({
    model: 'Aspect',
    getID,
    getCode,
    setLevel,
    getLevel,
    setExperience,
    getExperience,
    toString,
    pack,
  });

  AspectDataStore.store($self);

  return $self;
}
