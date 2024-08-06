TileRegistry.register('baseline-r4-2', {

  segments:[
    { type:_room, exits:[_n,_s,_e,_w], graphics:{
      incomplete:{ texture:'rough-room-4a' },
      complete:{ texture:'room-4a', style:_wallAndGround }
    }},
    { type:_node, exits:[], graphics:{
      complete:{ texture:'room-0b', style:_wallAndGround }
    }},
  ],

});
