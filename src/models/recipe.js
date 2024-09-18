global.Recipe = function(code) {
  const $data = RecipeRegistry.lookup(code);
  const $code = code;

  function getCode() { return $code; }
  function getData() { return $data; }

  return Object.freeze({
    getCode,
    getData,
  });

}
