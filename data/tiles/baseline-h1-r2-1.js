TileRegistry.register('baseline-h1-r2-1', {

  segments:[
    { type:_hall, exits:[_n], graphics:{
      incomplete:{ texture:'rough-hall-2c' },
      complete:{ texture:'hall-2c', style:_wallAndGround }
    }},
    { type:_room, exits:[_s,_w], graphics:{
      incomplete:{ texture:'rough-room-2a', angle:270 },
      complete:{ texture:'room-2a', angle:270, style:_wallAndGround }
    }},
  ],

});
