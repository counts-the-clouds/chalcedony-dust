TileRegistry.register('baseline-h1-r1-0', {

  edges:{
    n: _room,
    s: _hall,
    e: _stone,
    w: _stone,
  },

  segments:[
    { type:_room, exits:[_n], forms:{
      incomplete:{ background:'room-1' }
    }},

    { type:_hall, exits:[_s], forms:{
      incomplete:{ background:'hall-1', angle:180 }
    }},
  ],

});
