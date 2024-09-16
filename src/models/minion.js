global.Minion = function(code) {
  const $code = code;
  const $minionData = MinionRegistry.lookup($code);
  const $pluralName = $minionData.pluralName || `${$minionData.name}s`
  const $hasAspects = HasAspects($minionData);

  function getCode() { return $code; }
  function getName() { return $minionData.name; }
  function getPluralName() { return $pluralName; }
  function getTilesPerMinion() { return $minionData.tilesPerMinion; }
  function getCost() { return $minionData.cost; }
  function toString() { return `Minion[${$code}]`; }

  // ===========================================================================

  const $self = {
    getCode,
    getName,
    getPluralName,
    getTilesPerMinion,
    getCost,
    toString,
  };

  $hasAspects.attach($self)

  return Object.freeze($self);
}
