BlueprintRegistry.register('lair',{
  type: TileType.room,

  displayName: 'Lair',
  description: `Your minions will require a place to rest and call their home.`,

  constructionTime: 60,
  costPerTile:{ mana:5 },
  minSize:3,
});
