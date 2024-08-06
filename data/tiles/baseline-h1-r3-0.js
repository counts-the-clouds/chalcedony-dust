TileRegistry.register('baseline-h1-r3-0', {

  segments:[
    { type:_hall, exits:[_n], graphics:{
      incomplete:{ texture:'rough-hall-2a', angle:90 },
      complete:{ texture:'hall-2a', angle:90, style:_wallAndGround }
    }},
    { type:_room, exits:[_s,_e,_w], graphics:{
      incomplete:{ texture:'rough-room-3a' },
      complete:{ texture:'room-3a', style:_wallAndGround }
    }},
  ],

});
