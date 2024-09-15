GuardianRegistry.register('boss',{
  gender: Gender.male,
  species: 'goblin',
  firstName: 'Boss',
  lastName: 'Dangles',

  images: {
    default:'characters/boss.png',
  },

  summonDetails: {
    default: `The goblin boss is, much like your other goblin minions, completely insane. In order to effectively command a dungeon's worth of goblins though
      you'd have to be. Summoning him as one of your guardians will enhance all of your other goblin's abilities, though having stronger goblins will no doubt
      come with it's own problems.`,
  },

  windowTextOptions: [
    { conditions:[Condition.avatarNone()], text:`TODO: Boss Dangle's window text.` }
  ],

});
