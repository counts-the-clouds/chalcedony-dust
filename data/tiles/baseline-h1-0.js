TileRegistry.register('baseline-h1-0', {

  edges:{
    n: _hall,
    s: _stone,
    e: _stone,
    w: _stone,
  },

  segments:[
    { type:_room, exits:[_n], forms:{
      incomplete:{ background:'hall-1' }
    }},
  ],

});
