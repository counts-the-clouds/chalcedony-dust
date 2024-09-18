RoomRegistry.register('foundry',{
  hasWorkers: true,
  displayName: 'Foundry',

  view: {
    type: 'workstation',
  },

  workerSlots:[
    { code:'worker-1', name:'Foundryman', requiredSkill:'crafting' },
    { code:'worker-2', name:'Foundryman', requiredSkill:'crafting' },
  ],

  ingredientSlots:[
    { type:'ore', required:true },
    { type:'fuel', required:true },
    { type:'catalyst' },
    { type:'reagent' },
  ],

  recipeList:[
    Recipe({ result:'iron-ingot', ingredients:[
      { slot:'ore', item:'labrynthian-ore', count:5 },
      { slot:'fuel', aspect:'fuel', count:5 },
    ]}),
  ],

});
