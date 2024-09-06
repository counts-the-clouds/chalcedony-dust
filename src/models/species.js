global.Species = function(code) {
  const $code = code;
  const $speciesData = SpeciesRegistry.lookup(code);

  function getCode() { return $code; }
  function getName() { return $speciesData.name; }
  function getNameCategory() { return $speciesData.nameCategory; }

  function getPluralName() {
    return $speciesData.pluralName || `${$speciesData.name}s`;
  }

  function randomGender() {
    return Random.fromFrequencyMap($speciesData.genderDistribution || { male:45, female:45, futa:10 })
  }

  return Object.freeze({
    getCode,
    getName,
    getPluralName,
    getNameCategory,
    randomGender
  });
}
