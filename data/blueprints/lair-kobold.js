BlueprintRegistry.register('lair-kobold',{
  type: TileType.room,

  displayName: 'Kobold Lair',
  details: `The symbiotic relationship between the dungeons and the kobolds is old enough that one can scarcely imagine one without the other. While they may
    lack the majesty and raw power of their distant ancestors, the noble dragons, their trap making skills and their unique style of dungeon based guerrilla
    warfare make them an almost necessary addition to any dungeon.`,
  extra: { lair:'kobold' },

  upgradeFrom: 'lair',

  constructionTime: 60,
  costPerTile:{ mana:5 },
});
