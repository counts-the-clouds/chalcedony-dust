global.FeatureScrutinizer = (function() {

  function lookupFeature(context) {
    if (context.feature) { return context.feature; }
    if (context.featureID) { return FeatureDataStore.get(context.featureID); }
    throw `Feature not found in context`
  }

  function featureTypeIs(condition,context) {
    return lookupFeature(context).getType() === condition.type;
  }

  return Object.freeze({
    featureTypeIs
  });

})();