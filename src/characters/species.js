global.Species = function(data) {

  const $code = data.code;
  const $name = data.name;
  const $nameCategory = data.nameCategory;

  function getCode() { return $code; }
  function getName() { return $name; }
  function getNameCategory() { return $nameCategory; }

  return Object.freeze({
    getCode,
    getName,
    getNameCategory,
  });

}