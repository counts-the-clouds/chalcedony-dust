BlueprintRegistry.register('lair-goblin',{
  type: TileType.room,

  displayName: 'Goblin Lair',
  description: `(build a Goblin lair)`,

  upgradeFrom: 'lair',

  constructionTime: 60,
  costPerTile:{ mana:4 },
});
