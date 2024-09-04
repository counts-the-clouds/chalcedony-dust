BlueprintRegistry.register('lair-skreevin',{
  type: TileType.room,

  displayName: 'Skreevin Lair',
  description: `(build a Skreevin lair)`,

  upgradeFrom: 'lair',

  constructionTime: 60,
  costPerTile:{ mana:2 },
});
