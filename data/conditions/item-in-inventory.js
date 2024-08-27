ConditionRegistry.register('item-in-inventory', {

  // options { code }
  validate: function(options, _) {
    return GameInventory.getItemCount(options.code) > 0
  }

});
