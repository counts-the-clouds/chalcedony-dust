global.Condition = (function() {

  return Object.freeze({
    featureTypeIs: function(type) { return { key:ConditionKeys.featureTypeIs, type:type }; }
  })

})();
