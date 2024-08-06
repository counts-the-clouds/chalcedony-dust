TileRegistry.register('baseline-r1-3', {

  segments:[
    { type:_room, exits:[_n], graphics:{
      incomplete:{ texture:'rough-room-1d' },
      complete:{ texture:'room-1d', style:_wallAndGround }
    }},
    { type:_node, exits:[], graphics:{
      complete:{ texture:'room-0a', style:_wallAndGround }
    }},
  ],

});
