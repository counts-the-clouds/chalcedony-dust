RoomRegistry.register('foundry',{
  hasWorkers: true,
  displayName: 'Foundry',

  view: {
    type: 'workstation',
  },

  slots:[
    { code:'worker-1', name:'Foundryman', requiredSkill:'crafting' },
    { code:'worker-2', name:'Foundryman', requiredSkill:'crafting' },
  ],

});
