RoomRegistry.register('blacksmith',{
  displayName: 'Blacksmith',
  description: `One of your minions can be assigned here to craft weapons and armor from whatever materials are made
    available.`,

  constructionTime: 90,
  cost:{ mana:50, 'iron-ingot':5 },
  minSize:2,
  maxSize:4,

});
