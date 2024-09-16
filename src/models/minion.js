global.Minion = function(code) {
  const $code = code;
  const $minionData = MinionRegistry.lookup($code);
  const $pluralName = $minionData.pluralName || `${$minionData.name}s`
  const $hasAspects = HasAspects($minionData);

  function getCode() { return $code; }
  function getName() { return $minionData.name; }
  function getPluralName() { return $pluralName; }
  function getCost() { return $minionData.cost; }
  function toString() { return `Minion[${$code}]`; }

  function getMinionCountForSize(size) {
    return Math.floor(size / $minionData.tilesPerMinion)
  }

  // ===========================================================================

  const $self = {
    getCode,
    getName,
    getPluralName,
    getCost,
    toString,
    getMinionCountForSize,
  };

  $hasAspects.attach($self)

  return Object.freeze($self);
}
