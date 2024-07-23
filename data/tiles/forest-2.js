TileRegistry.register('forest-2', {

  edges:{
    n: _forestPath,
    s: _forestPath,
    e: _forbidden,
    w: _forbidden,
  },

  segments:[
    { type:_forestPath, exits:[_n,_s], forms:{
      incomplete:{ background:'f-2' }
    }}
  ],

});
