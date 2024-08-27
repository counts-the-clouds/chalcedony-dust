ConditionRegistry.register('feature-type-is', {

  // options: { type }
  // context: { feature } or { featureID }
  validate: function(options, context) {
    return CentralScrutinizer.lookupFeature(context).getType() === options.type;
  }

});
