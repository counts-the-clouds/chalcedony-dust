TileRegistry.register('baseline-h2-1', {

  edges:{
    n: _stone,
    s: _stone,
    e: _hall,
    w: _hall,
  },

  segments:[
    { type:_hall, exits:[_e,_w], forms:{
      incomplete:{ background:'hall-2s' }
    }},
  ],

});
