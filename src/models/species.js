global.Species = function(code) {
  const $code = code;
  const $speciesData = SpeciesRegistry.lookup(code);
  const $name = $speciesData.name;
  const $nameCategory = $speciesData.nameCategory;

  function getCode() { return $code; }
  function getName() { return $name; }
  function getNameCategory() { return $nameCategory; }

  function randomGender() {
    return Random.fromFrequencyMap($speciesData.genderDistribution || { male:45, female:45, futa:10 })
  }

  return Object.freeze({
    getCode,
    getName,
    getNameCategory,
    randomGender
  });
}
