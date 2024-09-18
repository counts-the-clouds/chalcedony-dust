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
    { displayName:'Ore',      code:'ore',      type:'ore',     required:true },
    { displayName:'Fuel',     code:'fuel',     type:'fuel',    required:true },
    { displayName:'Catalyst', code:'catalyst', type:'catalyst' },
    { displayName:'Reagent',  code:'reagent',  type:'reagent'  },
  ],

  recipeList:[
    Recipe({ result:'iron-ingot', ingredients:[
      { slot:'ore', item:'labrynthian-ore', count:5 },
      { slot:'fuel', aspect:'fuel', count:5 },
    ]}),
  ],

});
