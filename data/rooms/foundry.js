RoomRegistry.register('foundry',{
  displayName: 'Foundry',
  description: `One of your minions can be assigned here to smelt raw ores into ingots. Raw ore must be delivered to
    the foundry before it can be processed. `,

  constructionTime: 90,
  cost:{ mana:30, 'labrynthian-ore':10 },
  minSize: 4,
  maxSize: 6,
});
