global.GuardianBuilder = (function() {

  function build(options) {
    Validate.exists('Species',options.species);

    const guardian = Guardian({});
    const species = Species(options.species);
    const gender = selectGender(options, species);

    guardian.setSpecies(options.species);
    guardian.setGender(gender);

    const nameData = NameBuilder.getRandom({ category:species.getNameCategory(), gender:gender });

    // TODO: Names can come with a ton of different aspects and such that we
    //       can attach to the minion. This should be handled here once we're
    //       ready to start implementing that. Not actually sure though if that
    //       applies to minions or only guardians.
    //
    if (nameData.first) { guardian.setFirstName(nameData.first.name); }
    if (nameData.last) { guardian.setLastName(nameData.last.name); }

    Panopticon.induce(EventType.guardianSummoned, { guardian });

    return guardian;
  }

  function selectGender(options, species) {
    return options.gender ? options.gender : species.randomGender();
  }

  return Object.freeze({
    build
  });

})();
