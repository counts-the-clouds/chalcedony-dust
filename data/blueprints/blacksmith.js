BlueprintRegistry.register('blacksmith',{
  type: TileType.room,

  displayName: 'Blacksmith',
  details: `One of your minions can be assigned here to craft weapons and armor from whatever materials are made
    available.`,

  requirements:[
    Condition.itemInInventory('iron-ingot'),
  ],

  constructionTime: 90,
  costPerTile:{ mana:12, 'iron-ingot':5 },
  minSize:2,
  maxSize:4,

});