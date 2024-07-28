TileRegistry.register('baseline-h1-r2-1', {

  edges:{
    n: _hall,
    s: _room,
    e: _stone,
    w: _room,
  },

  segments:[
    { type:_room, exits:[_s,_w], forms:{
      incomplete:{ background:'room-2c', angle:270 }
    }},

    { type:_hall, exits:[_n], forms:{
      incomplete:{ background:'hall-1' }
    }},
  ],

});
