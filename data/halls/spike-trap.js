HallRegistry.register('spike-trap',{
  upgradeFrom: 'pit-trap',
  displayName: 'Spike Trap',
  description: `A Spike Trap is created by simply adding sharp iron spikes to the bottom of a Pit Trap.`,

  constructionTime: 30,
  costPerTile:{ mana:1, 'iron-ingot':1 },
});
