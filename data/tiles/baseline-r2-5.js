TileRegistry.register('baseline-r2-5', {

  segments:[
    { type:_room, exits:[_e], forms:{
      incomplete:{ background:'room-1d', angle:90 }
    }},
    { type:_room, exits:[_w], forms:{
      incomplete:{ background:'room-1d', angle:270 }
    }},
    { type:'temp', exits:[], forms:{
      base:{ background:'room-0a' }
    }},
  ],

});
