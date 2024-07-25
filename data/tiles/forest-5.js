TileRegistry.register('forest-5', {

  edges:{
    n: _forbidden,
    s: _forestPath,
    e: _forbidden,
    w: _forestPath,
  },

  segments:[
    { type:_forestPath, exits:[_s,_w], forms:{
      incomplete:{ background:'f-5' }
    }}
  ],

});
