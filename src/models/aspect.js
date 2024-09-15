global.Aspect = function(code,level=1) {
  const $code = code;
  const $data = AspectRegistry.lookup(code);
  let $level = level;

  function getCode() { return $code; }
  function getCategory() { return $data.category; }
  function getName() { return $data.name; }
  function getLevel() { return $level; }
  function setLevel(level) { $level = level; }

  return Object.freeze({
    getCode,
    getCategory,
    getName,
    getLevel,
    setLevel,
  })

}
