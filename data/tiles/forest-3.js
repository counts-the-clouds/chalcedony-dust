TileRegistry.register('forest-3', {

  edges:{
    n: _forbidden,
    s: _forestPath,
    e: _forestPath,
    w: _forbidden,
  },

  segments:[
    { type:_forestPath, exits:[_s,_e], forms:{
      incomplete:{ background:'tiles/forest-3.png' }
    }}
  ],

});
