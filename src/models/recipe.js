global.Recipe = function(data) {
  const $data = data;

  function getResult() { return $data.result }
  function getIngredients() { return $data.ingredients; }

  function getData() { return $data; }

  return Object.freeze({
    getData,
  });

}
