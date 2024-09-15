GuardianRegistry.register('gerva',{
  gender: Gender.male,
  species: 'hell-hound',
  firstName: 'Gerva',

  aspects: {
    fang: 4,
    fist: 2,
  },

  images: {
    default:'characters/gerva.png',
  },

  summonDetails: {
    default: `Gerva may look like an overgrown rottweiler, but as a hellhound of the abyss he's smarter and better spoken than most of the people encountered
      in a dungeon. At a glance though he's clearly not an average dog. Due to is his strong fire affinity his glossy black fur shimmers like coals in a
      fire pit. As a guardian he's both an incredibly loyal companion a fierce defender.`,
  },

  windowTextOptions: [
    { conditions:[Condition.avatarNone()], text:`TODO: Gerva's window text.` }
  ],

});
