global.CharacterBuilder = (function() {

  function buildMinion(options) {
    const species = Species(options.species);

    const name = NameBuilder.getRandom({
      category: species.getNameCategory(),
      gender: options.gender
    });

    const minion = Minion({ });
    minion.setSpecies(options.species);
    minion.setGender(options.gender);
    minion.setFirstName(name.first.name);
    minion.setLastName(name.last.name);

    return minion;
  }

  return Object.freeze({
    buildMinion,
  });

})();