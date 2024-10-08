GuardianRegistry.register('chalcedony',{
  gender: Gender.female,
  species: 'sylph',
  firstName: 'Chalcedony',
  lastName: 'Dust',

  aspects: {
    edge: 4,
    heart: 2,
  },

  images: {
    default:'characters/chalcedony.png',
  },

  summonDetails: {
    default: `From her appearance alone Chalcedony looks harmless. Like all wind spirits, she's very petite, with a physique like a young gymnast. This, when
      combined with her natural wind affinity, makes her very good at dodging. What makes her dangerous though are her skills at weaving illusions. That, and
      an almost psychotic fondness for luring adventures into deadly and elaborate traps.`,
  },

  windowTextOptions: [
    { conditions:[Condition.avatarNone()], text:`TODO: Chalcedony's window text.` }
  ],

});
