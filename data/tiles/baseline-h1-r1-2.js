TileRegistry.register('baseline-h1-r1-2', {

  segments:[
    { type:_hall, exits:[_e], graphics:{
      incomplete:{ texture:'rough-hall-2b', angle:90 },
      complete:{ texture:'hall-2b', angle:90, style:_wallAndGround }
    }},
    { type:_room, exits:[_n], graphics:{
      incomplete:{ texture:'rough-room-1e' },
      complete:{ texture:'room-1e', style:_wallAndGround }
    }},
  ],

});
