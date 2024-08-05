TileRegistry.register('baseline-h3-3', {

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
    { type:'temp', exits:[], forms:{
      base:{ background:'room-0a' }
    }},
  ],

});
