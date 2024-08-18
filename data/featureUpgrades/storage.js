FeatureUpgradeRegistry.register('storeroom',{
  featureType: TileType.room,
  displayName: 'Storeroom',
  description: `A Storeroom is simply an empty space that can be used to store any type of material. The amount that
    can be stored depends on the size of the room.`,

  cost:{ mana:20 },
  minSize: 4,
});
