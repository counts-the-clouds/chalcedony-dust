describe('NameBuilder', function() {

  it("gets a random demon female name", function() {
    SpecHelper.startLog('Female Demon Name');
    SpecHelper.times(10, () => {
      let first = NameBuilder.getRandom({ category:'DemonFemale', gender:Gender.female });
      let last = NameBuilder.getRandom({ category:'DemonLast', gender:Gender.female });
      SpecHelper.log(`${first.name} ${last.name}`);
    });
  });

  it("gets a random demon male name", function() {
    SpecHelper.startLog('Male Demon Name');
    SpecHelper.times(10, () => {
      let first = NameBuilder.getRandom({ category:'DemonMale', gender:Gender.male });
      let last = NameBuilder.getRandom({ category:'DemonLast', gender:Gender.male });
      SpecHelper.log(`${first.name} ${last.name}`);
    });
  });

  it("gets a random demon futa name", function() {
    SpecHelper.startLog('Futa Demon Name');
    SpecHelper.times(10, () => {
      let first = NameBuilder.getRandom({ category:'DemonFemale', gender:Gender.futa });
      let last = NameBuilder.getRandom({ category:'DemonLast', gender:Gender.futa });
      SpecHelper.log(`${first.name} ${last.name}`);
    });
  });

  it("gets a random elf female name", function() {
    SpecHelper.startLog('Female Elf Name');
    SpecHelper.times(10, () => {
      let first = NameBuilder.getRandom({ category:'ElfFemale', gender:Gender.female });
      let last = NameBuilder.getRandom({ category:'ElfLast', gender:Gender.female });
      SpecHelper.log(`${first.name} ${last.name}`);
    });
  });

  it("gets a random elf male name", function() {
    SpecHelper.startLog('Male Elf Name');
    SpecHelper.times(10, () => {
      let first = NameBuilder.getRandom({ category:'ElfMale', gender:Gender.male });
      let last = NameBuilder.getRandom({ category:'ElfLast', gender:Gender.male });
      SpecHelper.log(`${first.name} ${last.name}`);
    });
  });

  it("gets a random elf futa name", function() {
    SpecHelper.startLog('Futa Elf Name');
    SpecHelper.times(10, () => {
      let first = NameBuilder.getRandom({ category:'ElfFemale', gender:Gender.futa });
      let last = NameBuilder.getRandom({ category:'ElfLast', gender:Gender.futa });
      SpecHelper.log(`${first.name} ${last.name}`);
    });
  });

  it("gets a random goblin female name", function() {
    SpecHelper.startLog('Female Goblin Name');
    SpecHelper.times(10, () => {
      let first = NameBuilder.getRandom({ category:'GoblinFemale', gender:Gender.female });
      let last = NameBuilder.getRandom({ category:'GoblinLast', gender:Gender.female  });
      SpecHelper.log(`${first.name} ${last.name}`);
    });
  });

  it("gets a random goblin male name", function() {
    SpecHelper.startLog('Male Goblin Name');
    SpecHelper.times(10, () => {
      let first = NameBuilder.getRandom({ category:'GoblinMale', gender:Gender.male });
      let last = NameBuilder.getRandom({ category:'GoblinLast', gender:Gender.male });
      SpecHelper.log(`${first.name} ${last.name}`);
    });
  });

  it("gets a random goblin futa name", function() {
    SpecHelper.startLog('Futa Goblin Name');
    SpecHelper.times(10, () => {
      let first = NameBuilder.getRandom({ category:'GoblinFemale', gender:Gender.futa });
      let last = NameBuilder.getRandom({ category:'GoblinLast', gender:Gender.futa });
      SpecHelper.log(`${first.name} ${last.name}`);
    });
  });

  it("gets a random female kobold name", function() {
    SpecHelper.startLog('Female Kobold Name');
    SpecHelper.times(10, () => {
      SpecHelper.log(`${NameBuilder.getRandom({ category:'Kobold', gender:Gender.female }).name}`);
    });
  });

  it("gets a random male kobold name", function() {
    SpecHelper.startLog('Male Kobold Name');
    SpecHelper.times(10, () => {
      SpecHelper.log(`${NameBuilder.getRandom({ category:'Kobold', gender:Gender.male }).name}`);
    });
  });

});
