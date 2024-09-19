RoomRegistry.register('foundry',{
  hasWorkers: true,
  displayName: 'Foundry',

  view: {
    type: 'workstation',
    background: 'features/foundry.png',
  },

  workerSlots:[
    { code:'worker-1', name:'Foundryman', requiredSkill:'artistry' },
    { code:'worker-2', name:'Foundryman', requiredSkill:'artistry' },
  ],

  ingredientSlots: {
    ore:{      displayName:'Ore',      requireAspect:'ore',     required:true },
    fuel:{     displayName:'Fuel',     requireAspect:'fuel',    required:true },
    catalyst:{ displayName:'Catalyst', requireAspect:'catalyst' },
    reagent:{  displayName:'Reagent',  requireAspect:'reagent'  },
  },

  recipeList:[
    Recipe({ result:'iron-ingot', ingredients:[
      { slot:'ore', item:'labrynthian-ore', count:5 },
      { slot:'fuel', aspect:'fuel', count:5 },
    ]}),
  ],

});
