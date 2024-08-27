BlueprintRegistry.register('foundry',{
  type: TileType.room,

  displayName: 'Foundry',
  description: `One of your minions can be assigned here to smelt raw ores into ingots. Raw ore must be delivered to
    the foundry before it can be processed. `,

  requirements:[
    Condition.itemInInventory('labrynthian-ore')
  ],

  constructionTime: 90,
  costPerTile:{ mana:10, 'labrynthian-ore':3 },
  minSize: 4,
  maxSize: 6,
});
