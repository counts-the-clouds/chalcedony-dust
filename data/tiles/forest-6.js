TileRegistry.register('forest-6', {

  edges:{
    n: _forestPath,
    s: _forbidden,
    e: _forbidden,
    w: _forbidden,
  },

  segments:[
    { type:_forestPath, exits:[_n], forms:{
      incomplete:{ background:'tiles/f-6.png' }
    }}
  ],

});

