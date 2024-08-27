BlueprintRegistry.register('storeroom',{
  type: TileType.room,

  displayName: 'Storeroom',
  description: `A Storeroom is simply an empty space that can be used to store any type of material. The amount that
    can be stored depends on the size of the room.`,

  constructionTime: 30,
  costPerTile:{ mana:2 },
  minSize: 4,

  onConstructionComplete: feature => {
    GameInventory.addStorage(feature.getSize());
  },

});
