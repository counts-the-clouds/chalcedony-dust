TileRegistry.register('baseline-h3-r1-0', {

  segments:[
    { type:_hall, exits:[_e], forms:{
      incomplete:{ background:'hall-1b', angle:90 }
    }},
    { type:_hall, exits:[_s], forms:{
      incomplete:{ background:'hall-1b', angle:180 }
    }},
    { type:_hall, exits:[_w], forms:{
      incomplete:{ background:'hall-1b', angle:270 }
    }},
    { type:_room, exits:[_n], forms:{
      incomplete:{ background:'room-1c' }
    }},
  ],

});
