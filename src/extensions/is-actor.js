global.IsActor = function(data = {}) {

  let $gender = data.gender;
  let $species = data.species;
  let $firstName = data.firstName;
  let $lastName = data.lastName;
  let $possessiveFirst = data.possessiveFirst;
  let $possessiveLast = data.possessiveLast;

  function setGender(gender) { $gender = gender; }
  function getGender() { return $gender; }
  function setSpecies(code) { $species = code; }
  function getSpecies() { return Species($species); }
  function getSpeciesCode() { return $species; }
  function setFirstName(name) { $firstName = name; }
  function getFirstName() { return $firstName; }
  function setLastName(name) { $lastName = name; }
  function getLastName() { return $lastName; }
  function setPossessiveFirstName(name) { $possessiveFirst = name; }
  function setPossessiveLastName(name) { $possessiveLast = name; }
  function getPossessiveFirstName() { return $possessiveFirst || EnglishHelper.possessive($firstName); }
  function getPossessiveLastName() { return $possessiveLast || EnglishHelper.possessive($lastName); }
  function getFullName() { return `${$firstName||''} ${$lastName||''}`.trim() }

  // ===========================================================================

  function pack() {
    return {
      gender: $gender,
      species: $species,
      firstName: $firstName,
      lastName: $lastName,
    };
  }

  function attach(model) {
    model.setGender = setGender;
    model.getGender = getGender;
    model.setSpecies = setSpecies;
    model.getSpecies = getSpecies;
    model.getSpeciesCode = getSpeciesCode;
    model.setFirstName = setFirstName;
    model.getFirstName = getFirstName;
    model.setLastName = setLastName;
    model.getLastName = getLastName;
    model.setPossessiveFirstName = setPossessiveFirstName;
    model.setPossessiveLastName = setPossessiveLastName;
    model.getPossessiveFirstName = getPossessiveFirstName;
    model.getPossessiveLastName = getPossessiveLastName;
    model.getFullName = getFullName;
  }

  return Object.freeze({
    pack,
    attach,
  });

}
