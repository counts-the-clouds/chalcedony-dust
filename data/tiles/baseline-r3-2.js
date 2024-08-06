TileRegistry.register('baseline-r3-2', {

  segments:[
    { type:_room, exits:[_s,_e,_w], graphics:{
      incomplete:{ texture:'rough-room-3b' },
      complete:{ texture:'room-3b', style:_wallAndGround }
    }},
    { type:_node, exits:[], graphics:{
      complete:{ texture:'room-0a', style:_wallAndGround }
    }},
  ],

});
