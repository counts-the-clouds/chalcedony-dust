
// options { code }
ConditionRegistry.register('item-in-inventory', {
  validate: function(options) { return GameInventory.getItemCount(options.code) > 0 }
});
