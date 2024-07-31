TileRegistry.register('dungeon-core', {

  clock: { code:'generate-tile' },

  segments:[
    { type:_hall, exits:[_s], forms:{
      incomplete:{ background:'hall-1', angle:180 }
    }},

    { type:_room, exits:[_e,_w], forms:{
      incomplete:{ background:'room-2s' }
    }},

    { type:'core', exits:[], forms:{
      base:{ background:'core' }
    }},
  ],

});
