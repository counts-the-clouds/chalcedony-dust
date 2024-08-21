global.IsActor = function(data = {}) {

  let $gender = data.gender;
  let $firstName = data.firstName;
  let $lastName = data.lastName;

  function setGender(gender) { $gender = gender; }
  function getGender() { return $gender; }
  function setFirstName(name) { $firstName = name; }
  function getFirstName() { return $firstName; }
  function setLastName(name) { $lastName = name; }
  function getLastName() { return $lastName; }
  function getFullName() { return `${$firstName} ${$lastName}` }

  // ===========================================================================

  function pack() {
    return {
      gender: $gender,
      firstName: $firstName,
      lastName: $lastName,
    };
  }

  function attach(model) {
    model.setGender = setGender;
    model.getGender = getGender;
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
