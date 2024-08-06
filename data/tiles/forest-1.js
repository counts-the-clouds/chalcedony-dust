TileRegistry.register('forest-1', {
  emptyEdgeType: _forbidden,

  clock: { code:'generate-tile' },

  segments:[
    { type:_forestPath, exits:[_s], graphics:{
      incomplete:{ texture:'f-1' }
    }}
  ],

});
