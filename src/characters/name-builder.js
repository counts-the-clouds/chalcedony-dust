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


  function getRandom(options) {
    let name;
    let tries = 0;

  //   if (Names[options.category] == null) {
  //     throw `Unknown index: ${options.category}`;
  //   }
  //
  //   while (tries < 100) {
      // tries += 1;
      name = Random.from($names[options.category]);
      // if (meetsRequirements(name, options)) {
        return name;
      // }
    // }
  //
  //   // I give up, their name is Greg.
  //   return { name:"Greg" };
  }


  // This will eventually need to be rewritten. It works for checking against a
  // sex option, but eventually we'll probably need to check against a
  // character to see if the name fits or not.
  // function meetsRequirements(name, options) {
  //   if (name.restriction) {
  //     if (name.restriction == _male) { return options.sex == _male; }
  //     if (name.restriction == _female) { return options.sex == _female; }
  //     if (name.restriction == _notMale) { return options.sex != _male; }
  //     if (name.restriction == _notFemale) { return options.sex != _female; }
  //     if (name.restriction == _hasFur) { return false; }
  //     if (name.restriction == _hasScales) { return false; }
  //     if (name.restriction == _hasSkin) { return false; }
  //   }
  //
  //   return true;
  // }

  return Object.freeze({
    addName,
    getRandom,
  })

})();