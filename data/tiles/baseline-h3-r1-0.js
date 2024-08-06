TileRegistry.register('baseline-h3-r1-0', {

  segments:[
    { type:_hall, exits:[_e], graphics:{
      incomplete:{ texture:'rough-hall-1b', angle:90 },
      complete:{ texture:'hall-1b', angle:90, style:_wallAndGround }
    }},
    { type:_hall, exits:[_s], graphics:{
      incomplete:{ texture:'rough-hall-1b', angle:180 },
      complete:{ texture:'hall-1b', angle:180, style:_wallAndGround }
    }},
    { type:_hall, exits:[_w], graphics:{
      incomplete:{ texture:'rough-hall-1b', angle:270 },
      complete:{ texture:'hall-1b', angle:270, style:_wallAndGround }
    }},
    { type:_room, exits:[_n], graphics:{
      incomplete:{ texture:'rough-room-1c' },
      complete:{ texture:'room-1c', style:_wallAndGround }
    }},
  ],

});
