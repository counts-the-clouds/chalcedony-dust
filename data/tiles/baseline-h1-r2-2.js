TileRegistry.register('baseline-h1-r2-2', {

  edges:{
    n: _hall,
    s: _room,
    e: _room,
    w: _stone,
  },

  segments:[
    { type:_room, exits:[_s,_e], forms:{
      incomplete:{ background:'room-2c', angle:180 }
    }},

    { type:_hall, exits:[_n], forms:{
      incomplete:{ background:'hall-1' }
    }},
  ],

});
