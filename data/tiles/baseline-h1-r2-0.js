TileRegistry.register('baseline-h1-r2-0', {

  edges:{
    n: _hall,
    s: _stone,
    e: _room,
    w: _room,
  },

  segments:[
    { type:_room, exits:[_e,_w], forms:{
      incomplete:{ background:'room-2s' }
    }},

    { type:_hall, exits:[_n], forms:{
      incomplete:{ background:'hall-1' }
    }},
  ],

});
