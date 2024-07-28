TileRegistry.register('baseline-h2-0', {

  edges:{
    n: _hall,
    s: _stone,
    e: _stone,
    w: _hall,
  },

  segments:[
    { type:_hall, exits:[_n,_w], forms:{
      incomplete:{ background:'hall-2c' }
    }},
  ],

});
