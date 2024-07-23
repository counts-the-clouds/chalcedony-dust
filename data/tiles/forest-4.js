TileRegistry.register('forest-4', {

  edges:{
    n: _forestPath,
    s: _forestPath,
    e: _forbidden,
    w: _forbidden,
  },

  segments:[
    { type:_forestPath, exits:[_n,_s], forms:{
      incomplete:{ background:'tiles/f-4.png' }
    }}
  ],

});
