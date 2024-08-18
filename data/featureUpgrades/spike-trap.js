FeatureUpgradeRegistry.register('spike-trap',{
  featureType: TileType.hall,
  upgradeFrom: 'pit-trap',
  displayName: 'Spike Trap',
  description: `A Spike Trap is created by simply adding sharp iron spikes to the bottom of a Pit Trap.`,

  cost:{ mana:20, 'iron-ingot':2 },
});
