
// options: { type }
// context: { feature } or { featureID }
ConditionRegistry.register('feature-type-is', {
  validate: function(options, context) { return CentralScrutinizer.lookupFeature(context).getType() === options.type; }
});
