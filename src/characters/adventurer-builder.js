global.AdventurerBuilder = (function() {

  function build(options) {
    Validate.exists('Species',options.species);

    const adventurer = Adventurer({});
    const species = Species(options.species);
    const gender = selectGender(options, species);

    adventurer.setSpecies(options.species);
    adventurer.setGender(gender);

    const nameData = NameBuilder.getRandom({ category:species.getNameCategory(), gender:gender });

    // TODO: Names can come with a ton of different aspects and such that we
    //       can attach to the adventurer. This should be handled here once
    //       we're ready to start implementing that.
    //
    if (nameData.first) { adventurer.setFirstName(nameData.first.name); }
    if (nameData.last) { adventurer.setLastName(nameData.last.name); }

    Panopticon.induce(EventType.adventurerCreated, { adventurer });

    return adventurer;
  }

  function selectGender(options, species) {
    return options.gender ? options.gender : species.randomGender();
  }

  return Object.freeze({
    build
  });

})();
