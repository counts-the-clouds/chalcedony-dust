global.CentralScrutinizer = (function() {

  function allConditionsPass(conditions,context) {
    return true;
  }

  function conditionPasses(condition,context) {
    return true;
  }

  return Object.freeze({
    allConditionsPass,
    conditionPasses,
  });

})();