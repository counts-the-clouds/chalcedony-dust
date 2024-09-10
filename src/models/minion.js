global.Minion = function(code) {
  const data = MinionRegistry.lookup(code);

  const $code = code;
  const $name = data.name;
  const $pluralName = data.pluralName || `${name}s`

  function getCode() { return $code; }
  function getName() { return $name; }
  function getPluralName() { return $pluralName; }
  function toString() { return `Minion[${$code}]`; }

  return Object.freeze({
    getCode,
    getName,
    getPluralName,
    toString,
  });
}
