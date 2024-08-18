RoomRegistry.register('foundry',{
  displayName: 'Foundry',
  description: `A monster can be assigned here to smelt raw ores into ingots. Raw ore must be delivered to the foundry
    before it can be processed. `,

  cost:{ mana:30, 'iron-ore':10 },
  minSize: 4,
  maxSize: 6,
});
