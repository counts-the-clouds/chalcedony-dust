BlueprintRegistry.register('lair-skreevin',{
  type: TileType.room,

  displayName: 'Skreevin Lair',
  details: `Due to their explosive breeding, the cowardly and diminutive rat people are found in nearly every corner of the world. As favored servants of the
    demon prince of filth the Skreevin carry a variety of plagues. Even when they're are defeated in combat, which they usually are, the diseases they spread
    can cripple even the strongest adventurer.`,
  extra: { lair:'skreevin' },

  upgradeFrom: 'lair',

  constructionTime: 60,
  costPerTile:{ mana:4 },
});
