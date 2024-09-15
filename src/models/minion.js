global.Minion = function(code) {
  const $code = code;
  const $minionData = MinionRegistry.lookup($code);
  const $pluralName = $minionData.pluralName || `${$minionData.name}s`

  function getCode() { return $code; }
  function getName() { return $minionData.name; }
  function getPluralName() { return $pluralName; }
  function getTilesPerMinion() { return $minionData.tilesPerMinion; }
  function getCost() { return $minionData.cost; }
  function hasSkill(code) { return $minionData.skills[code] != null }
  function getSkill(code) { return $minionData.skills[code] || 0 }
  function toString() { return `Minion[${$code}]`; }

  return Object.freeze({
    getCode,
    getName,
    getPluralName,
    getTilesPerMinion,
    getCost,
    hasSkill,
    getSkill,
    toString,
  });
}
