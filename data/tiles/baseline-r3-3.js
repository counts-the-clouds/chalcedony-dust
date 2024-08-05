TileRegistry.register('baseline-r3-3', {

  segments:[
    { type:_room, exits:[_e], forms:{
      incomplete:{ background:'room-1e', angle:90 }
    }},
    { type:_room, exits:[_s], forms:{
      incomplete:{ background:'room-1e', angle:180 }
    }},
    { type:_room, exits:[_w], forms:{
      incomplete:{ background:'room-1e', angle:270 }
    }},
    { type:'temp', exits:[], forms:{
      base:{ background:'room-0b' }
    }},
  ],

});
