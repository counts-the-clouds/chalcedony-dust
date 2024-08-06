TileRegistry.register('baseline-r2-5', {

  segments:[
    { type:_room, exits:[_e], graphics:{
      incomplete:{ texture:'rough-room-1d', angle:90 },
      complete:{ texture:'room-1d', angle:90, style:_wallAndGround }
    }},
    { type:_room, exits:[_w], graphics:{
      incomplete:{ texture:'rough-room-1d', angle:270 },
      complete:{ texture:'room-1d', angle:270, style:_wallAndGround }
    }},
    { type:_node, exits:[], graphics:{
      complete:{ texture:'room-0a', style:_wallAndGround }
    }},
  ],

});
