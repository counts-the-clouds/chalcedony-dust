TileRegistry.register('baseline-h1-r3-1', {

  segments:[
    { type:_hall, exits:[_n], forms:{
      incomplete:{ background:'hall-1c' }
    }},
    { type:_room, exits:[_s,_e,_w], forms:{
      incomplete:{ background:'room-3b' }
    }},
    { type:'temp', exits:[], forms:{
      base:{ background:'room-0a' }
    }},
  ],

});
