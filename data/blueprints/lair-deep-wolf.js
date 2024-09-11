BlueprintRegistry.register('lair-deep-wolf',{
  type: TileType.room,

  displayName: 'Deep Wolf Lair',
  description: `(build a Deep Wolf lair)`,

  upgradeFrom: 'lair',

  constructionTime: 60,
  costPerTile:{ mana:3 },
});
