
// TODO: Eventually we'll need a model that represents the dungeon's avatar.
//       Nothing like that currently exists though so this is always true.
ConditionRegistry.register('avatar-none', {
  validate: function() { return true; }
});
