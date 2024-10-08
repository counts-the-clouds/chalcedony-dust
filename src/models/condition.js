global.Condition = (function() {

  function buildCondition(code, options) {
    return Object.freeze({
      isValid: (context) => {
        return ConditionRegistry.lookup(code).validate(options, context);
      }
    });
  }

  return Object.freeze({
    avatarNone: function() { return buildCondition('avatar-none'); },
    featureTypeIs: function(type) { return buildCondition('feature-type-is',{ type }); },
    itemInInventory: function(code) { return buildCondition('item-in-inventory',{ code }); },
  });

})();
