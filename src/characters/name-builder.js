global.NameBuilder = (function() {

  const $names = {
    DemonMale: [],
    DemonFemale: [],
    DemonLast: [],
    ElfMale: [],
    ElfFemale: [],
    ElfLast: [],
    GoblinMale: [],
    GoblinFemale: [],
    GoblinLast: [],
    Kobold: [],
  };

  function addName(name, category) {
    $names[category].push(name);
  }

  // Get a full random name given a gender and a species. Arguments should be
  // capitalized so that we can easilly make an index name from them.
  // function getFullRandom(gender, species) {
  //   gender = TextHelper.titlecase(gender);
  //   species = TextHelper.titlecase(species);
  //
  //   let sex = (gender == "Futa") ? "Female" : gender;
  //
  //   if (species == 'Kobold') {
  //     return { first: getRandom({ index:'Kobold', sex:sex }) }
  //   }
  //
  //   return {
  //     first: getRandom({ index:`${species}${sex}`, sex:sex }),
  //     last:  getRandom({ index:`${species}Last`,   sex:sex }),
  //   };
  // }


  // TODO: There's got to be a better way to do this right?
  function getRandom(options) {
    let name;
    let tries = 0;

    while (tries < 100) {
      tries += 1;
      name = Random.from($names[options.category]);
      if (meetsRequirements(name, options)) {

        if (tries > 2) {
          console.warn(`Took a few tries (${tries}) to randomly select a name given`,options)
        }

        return name;
      }
    }


    // I give up, their name is Greg.
    return { name:"Greg" };
  }


  // TODO: This will need to check against other character attributes such as
  //       species.
  function meetsRequirements(name, options) {
    if (name.restriction) {
      if (name.restriction === NameRestriction.male) { return options.gender === Gender.male; }
      if (name.restriction === NameRestriction.female) { return options.gender === Gender.female; }
      if (name.restriction === NameRestriction.notMale) { return options.gender !== Gender.male; }
      if (name.restriction === NameRestriction.notFemale) { return options.gender !== Gender.female; }
      if (name.restriction === NameRestriction.hasFur) { return false; }
      if (name.restriction === NameRestriction.hasScales) { return false; }
      if (name.restriction === NameRestriction.hasSkin) { return false; }
    }

    return true;
  }

  return Object.freeze({
    addName,
    getRandom,
  })

})();