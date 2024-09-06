global.IsActor = function(data = {}) {

  let $gender = data.gender;
  let $species = data.species;
  let $firstName = data.firstName;
  let $lastName = data.lastName;

  function setGender(gender) { $gender = gender; }
  function getGender() { return $gender; }
  function setSpecies(code) { $species = code; }
  function getSpecies() { return Species($species); }
  function setFirstName(name) { $firstName = name; }
  function getFirstName() { return $firstName; }
  function setLastName(name) { $lastName = name; }
  function getLastName() { return $lastName; }
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
    model.setFirstName = setFirstName;
    model.getFirstName = getFirstName;
    model.setLastName = setLastName;
    model.getLastName = getLastName;
    model.getFullName = getFullName;
  }

  return Object.freeze({
    pack,
    attach,
  });

}
