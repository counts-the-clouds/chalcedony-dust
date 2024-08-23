RoomRegistry.register('storeroom',{
  displayName: 'Storeroom',
  description: `A Storeroom is simply an empty space that can be used to store any type of material. The amount that
    can be stored depends on the size of the room.`,

  constructionTime: 30,
  cost:{ mana:20 },
  minSize: 4,

  inventorySizePerTile: 2,

});
