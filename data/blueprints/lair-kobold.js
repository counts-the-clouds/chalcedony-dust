BlueprintRegistry.register('lair-kobold',{
  type: TileType.room,

  displayName: 'Kobold Lair',
  description: `(build a Kobold lair)`,

  upgradeFrom: 'lair',

  constructionTime: 60,
  costPerTile:{ mana:3 },
});
