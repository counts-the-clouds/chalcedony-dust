BlueprintRegistry.register('lair-deep-wolf',{
  type: TileType.room,

  displayName: 'Deep Wolf Lair',
  details: `Deep Wolves are both larger and smarter than their surface cousins. While their role may be limited to defending the dungeon from attackers, they
    are fearsome opponents, especially when encountered in groups.`,
  extra: { lair:'deep-wolf' },

  upgradeFrom: 'lair',

  constructionTime: 60,
  costPerTile:{ mana:3 },
});
