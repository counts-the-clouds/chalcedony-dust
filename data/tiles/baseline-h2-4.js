TileRegistry.register('baseline-h2-4', {

  segments:[
    { type:_hall, exits:[_n], forms:{
      incomplete:{ background:'hall-1b' }
    }},
    { type:_hall, exits:[_w], forms:{
      incomplete:{ background:'hall-1b', angle:270 }
    }},
    { type:'temp', exits:[], forms:{
      base:{ background:'room-0a' }
    }},
  ],

});
