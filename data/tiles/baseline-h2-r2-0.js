TileRegistry.register('baseline-h2-r2-0', {

  segments:[
    { type:_hall, exits:[_e], graphics:{
      incomplete:{ texture:'rough-hall-1b', angle:90 },
      complete:{ texture:'hall-1b', angle:90, style:_wallAndGround }
    }},
    { type:_hall, exits:[_w], graphics:{
      incomplete:{ texture:'rough-hall-1b', angle:270 },
      complete:{ texture:'hall-1b', angle:270, style:_wallAndGround }
    }},
    { type:_room, exits:[_n,_s], graphics:{
      incomplete:{ texture:'rough-room-2e', angle:90 },
      complete:{ texture:'room-2e', angle:90, style:_wallAndGround }
    }},
  ],

});
