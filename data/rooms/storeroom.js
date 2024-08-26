RoomRegistry.register('storeroom',{
  displayName: 'Storeroom',
  description: `A Storeroom is simply an empty space that can be used to store any type of material. The amount that
    can be stored depends on the size of the room.`,

  constructionTime: 30,
  costPerTile:{ mana:2 },
  minSize: 4,

  onConstructionComplete: feature => {
    GameInventory.addStorage(feature.getSize());
    console.log("Storeroom Construction Complete. Total storage is now",GameInventory.getStorage());
  },

  casement: {
    layout: 'card-layout',
    background: 'backgrounds/storeroom.png',
    details: `This storeroom is increasing the dungeon's storage capacity by {{@size}} units.`,
  },

});
