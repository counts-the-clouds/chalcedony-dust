global.MinionBuilder = (function() {

  function build(options) {
    Validate.exists('Species',options.species);

    const minion = Minion({});
    const species = Species(options.species);
    const gender = selectGender(options, species);

    minion.setSpecies(options.species);
    minion.setGender(gender);

    const nameData = NameBuilder.getRandom({ category:species.getNameCategory(), gender:gender });

    // TODO: Names can come with a ton of different aspects and such that we
    //       can attach to the minion. This should be handled here once we're
    //       ready to start implementing that. Not actually sure though if that
    //       applies to minions or only guardians.
    //
    if (nameData.first) { minion.setFirstName(nameData.first.name); }
    if (nameData.last) { minion.setLastName(nameData.last.name); }

    return minion;
  }

  function selectGender(options, species) {
    return options.gender ? options.gender : species.randomGender();
  }

  return Object.freeze({
    build
  });

})()