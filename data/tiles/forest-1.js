TileRegistry.register('forest-1', {

  edges:{
    n: _forbidden,
    s: _forestPath,
    e: _forbidden,
    w: _forbidden,
  },

  segments:[
    { type:_forestPath, exits:[_s], forms:{
      incomplete:{ background:'tiles/forest-1.png' }
    }}
  ],

});

