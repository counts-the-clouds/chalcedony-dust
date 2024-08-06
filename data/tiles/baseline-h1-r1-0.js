TileRegistry.register('baseline-h1-r1-0', {

  segments:[
    { type:_hall, exits:[_s], graphics:{
      incomplete:{ texture:'rough-hall-1c', angle:180 },
      complete:{ texture:'hall-1c', angle:180, style:_wallAndGround }
    }},
    { type:_room, exits:[_n], graphics:{
      incomplete:{ texture:'rough-room-1a' },
      complete:{ texture:'room-1a', style:_wallAndGround }
    }},
  ],

});
