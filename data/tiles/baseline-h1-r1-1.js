TileRegistry.register('baseline-h1-r1-1', {

  edges:{
    n: _room,
    s: _stone,
    e: _stone,
    w: _hall,
  },

  segments:[
    { type:_room, exits:[_n], forms:{
      incomplete:{ background:'room-1' }
    }},

    { type:_hall, exits:[_w], forms:{
      incomplete:{ background:'hall-1', angle:270 }
    }},
  ],

});
