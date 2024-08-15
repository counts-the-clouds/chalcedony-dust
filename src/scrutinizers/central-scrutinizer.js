global.CentralScrutinizer = (function() {

  // It is my responsibility to enforce all the laws that haven't been passed yet.
  //    - Frank Zappa
  //
  // Really all this so that we can have conditions that are easily persisted
  // because functions cannot be serialized to JSON.

  function allConditionsPass(conditions,context) {
    for (const condition of (conditions||[])) {
      if (false === conditionPasses(condition,context)) { return false; }
    }
    return true;
  }

  function conditionPasses(condition,context) {
    switch (condition.key) {
      case ConditionKeys.featureTypeIs: return FeatureScrutinizer.featureTypeIs(condition,context);
    }

    throw `Unrecognized Condition: ${condition.key}`;
  }

  return Object.freeze({
    allConditionsPass,
    conditionPasses,
  });

})();
