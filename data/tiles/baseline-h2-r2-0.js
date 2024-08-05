TileRegistry.register('baseline-h2-r2-0', {

  segments:[
    { type:_hall, exits:[_e], forms:{
      incomplete:{ background:'hall-1b', angle:90 }
    }},
    { type:_hall, exits:[_w], forms:{
      incomplete:{ background:'hall-1b', angle:270 }
    }},
    { type:_room, exits:[_n,_s], forms:{
      incomplete:{ background:'room-2e', angle:90 }
    }},
  ],

});
