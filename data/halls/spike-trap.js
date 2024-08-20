HallRegistry.register('spike-trap',{
  upgradeFrom: 'pit-trap',
  displayName: 'Spike Trap',
  description: `A Spike Trap is created by simply adding sharp iron spikes to the bottom of a Pit Trap.`,

  constructionTime: 30,
  cost:{ mana:20, 'iron-ingot':2 },
});
