BlueprintRegistry.register('lair-goblin',{
  type: TileType.room,

  displayName: 'Goblin Lair',
  details: ` In many ways dungeon Goblins are the embodiment of pure chaos. Knowing that if killed they'll simply respawn has completely erased whatever small
    amount of self preservation they might have had. Given their love of explosives, poor impulse control, and their complete lack of inhibitions, they make
    both deadly opponents and risky allies.`,
  extra: { lair:'goblin' },

  upgradeFrom: 'lair',

  constructionTime: 60,
  costPerTile:{ mana:6 },
});
