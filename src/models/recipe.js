global.Recipe = function(data) {
  const $data = data;

  function getResult() { return $data.result }
  function getIngredients() { return $data.ingredients; }

  return Object.freeze({
    getResult,
    getIngredients,
  });
}
