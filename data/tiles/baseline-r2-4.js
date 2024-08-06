TileRegistry.register('baseline-r2-4', {

  segments:[
    { type:_room, exits:[_n], graphics:{
      incomplete:{ texture:'rough-room-1e' },
      complete:{ texture:'room-1e', style:_wallAndGround }
    }},
    { type:_room, exits:[_w], graphics:{
      incomplete:{ texture:'rough-room-1e', angle:270 },
      complete:{ texture:'room-1e', angle:270, style:_wallAndGround }
    }},
  ],

});
