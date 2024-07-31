TileRegistry.register('dungeon-core', {

  clock: { code:'generate-tile' },

  segments:[
    { type:_hall, exits:[_n], forms:{
      incomplete:{ background:'hall-1' }
    }},

    { type:_hall, exits:[_s], forms:{
      incomplete:{ background:'hall-1', angle:180 }
    }},

    { type:_room, exits:[_e], forms:{
      incomplete:{ background:'room-1', angle:90 }
    }},

    { type:_room, exits:[_w], forms:{
      incomplete:{ background:'room-1', angle:270 }
    }},

    { type:'core', exits:[], forms:{
      base:{ background:'core' }
    }},
  ],

});
