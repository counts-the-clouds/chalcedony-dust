TileRegistry.register('baseline-h1-r1-1', {

  segments:[
    { type:_hall, exits:[_w], graphics:{
      incomplete:{ texture:'rough-hall-2b', angle:270 },
      complete:{ texture:'hall-2b', angle:270, style:_wallAndGround }
    }},
    { type:_room, exits:[_s], graphics:{
      incomplete:{ texture:'rough-room-1e', angle:180 },
      complete:{ texture:'room-1e', angle:180, style:_wallAndGround }
    }},
  ],

});
