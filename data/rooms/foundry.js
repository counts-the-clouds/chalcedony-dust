RoomRegistry.register('foundry',{
  hasWorkers: true,
  displayName: 'Foundry',

  view: {
    type: 'workstation',
  },

  workerSlots:[
    { code:'worker-1', name:'Foundryman', requiredSkill:'artistry' },
    { code:'worker-2', name:'Foundryman', requiredSkill:'artistry' },
  ],

  ingredientSlots:[
    { displayName:'Ore',      code:'ore',      requireAspect:'ore',     required:true },
    { displayName:'Fuel',     code:'fuel',     requireAspect:'fuel',    required:true },
    { displayName:'Catalyst', code:'catalyst', requireAspect:'catalyst' },
    { displayName:'Reagent',  code:'reagent',  requireAspect:'reagent'  },
  ],

  recipeList:[
    Recipe({ result:'iron-ingot', ingredients:[
      { slot:'ore', item:'labrynthian-ore', count:5 },
      { slot:'fuel', aspect:'fuel', count:5 },
    ]}),
  ],

});
