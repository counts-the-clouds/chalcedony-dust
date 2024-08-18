RoomRegistry.register('blacksmith',{
  displayName: 'Blacksmith',
  description: `A monster can be assigned here to craft weapons and armor from whatever materials are made available.`,

  cost:{ mana:50, 'iron-ingot':5 },
  minSize:2,
  maxSize:4,
});
