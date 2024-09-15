GuardianRegistry.register('azalon',{
  gender: Gender.male,
  species: 'vulpin',
  firstName: 'Azalon',
  lastName: 'Rushwater',

  aspects: {
    candle: 4,
    heart: 2,
  },

  images: {
    default:'characters/azalon.png',
  },

  summonDetails: {
    default: `There are some who might consider Azalon an odd choice for a guardian. The fox is only 5'2 with a lithe build and a soft and friendly face. He
      has no combat skills to speak of and would probably lose in a fight against any of your dungeon minions. He is however an accomplished scholar, and has
      spent years studying the history of the world's dungeons. Though he lacks strength, his knowledge could be invaluable in discovering new ways to improve
      the dungeon.`,
  },

  windowTextOptions: [
    { conditions:[Condition.avatarNone()], text:`TODO: Azalon's window text.` }
  ],

});
