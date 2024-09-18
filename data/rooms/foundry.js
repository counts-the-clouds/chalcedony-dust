RoomRegistry.register('foundry',{
  hasWorkers: true,
  displayName: 'Foundry',

  view: {
    type: 'workstation',
  },

  recipes:['smelting-recipes'],

  ingredientSlots:[
    { type:'ore', required:true },
    { type:'fuel', required:true },
    { type:'catalyst' },
    { type:'reagent' },
  ],

  workerSlots:[
    { code:'worker-1', name:'Foundryman', requiredSkill:'crafting' },
    { code:'worker-2', name:'Foundryman', requiredSkill:'crafting' },
  ],

});
