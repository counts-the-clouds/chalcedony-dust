global.Validate = (function() {

  function between(name, value, min, max, message=null) {
    if (value < min) { throw message ? message : `Validation Failed: ${name}.${value} less than ${min}`; }
    if (value > max) { throw message ? message : `Validation Failed: ${name}.${value} greater than ${max}`; }
  }

  // function isIn(name, value, list, message=null) {
  //   if (!list.includes(value)) { throw message ? message : `Validation Failed: ${name}[${value}] not in list.`; }
  // }

  // function allIn(name, array, validValues, message=null) {
  //   for (const element of array) {
  //     if (!validValues.includes(element)) {
  //       throw message ? message : `Validation Failed: ${name}[${element}] is not in the list of valid values.`;
  //     }
  //   }
  // }

  function exists(name, value, message=null) {
    if (value == null) { throw message ? message : `Validation Failed: ${name} is null.` }
  }

  // function arrayLength(name, array, length, message=null) {
  //   if (array.length !== length) { throw message ? message : `Validation Failed: ${name} is not ${length} elements long.` }
  // }

  return Object.freeze({
    between,
    // isIn,
    // allIn,
    exists,
    // arrayLength,
  });

})();
