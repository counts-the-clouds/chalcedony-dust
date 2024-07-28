TileRegistry.register('baseline-h1-r3', {

  edges:{
    n: _hall,
    s: _room,
    e: _room,
    w: _room,
  },

  segments:[
    { type:_room, exits:[_s,_e,_w], forms:{
      incomplete:{ background:'room-3' }
    }},

    { type:_hall, exits:[_n], forms:{
      incomplete:{ background:'hall-1' }
    }},
  ],

});
