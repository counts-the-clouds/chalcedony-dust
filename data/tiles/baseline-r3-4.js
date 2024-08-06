TileRegistry.register('baseline-r3-4', {

  segments:[
    { type:_room, exits:[_e], graphics:{
      incomplete:{ texture:'rough-room-1e', angle:90 },
      complete:{ texture:'room-1e', angle:90, style:_wallAndGround }
    }},
    { type:_room, exits:[_s], graphics:{
      incomplete:{ texture:'rough-room-1e', angle:180 },
      complete:{ texture:'room-1e', angle:180, style:_wallAndGround }
    }},
    { type:_room, exits:[_w], graphics:{
      incomplete:{ texture:'rough-room-1e', angle:270 },
      complete:{ texture:'room-1e', angle:270, style:_wallAndGround }
    }},
  ],

});
