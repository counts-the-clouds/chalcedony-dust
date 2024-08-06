TileRegistry.register('baseline-h1-r2-2', {

  segments:[
    { type:_hall, exits:[_n], graphics:{
      incomplete:{ texture:'rough-hall-2c', angle:90 },
      complete:{ texture:'hall-2c', angle:90, style:_wallAndGround }
    }},
    { type:_room, exits:[_s,_e], graphics:{
      incomplete:{ texture:'rough-room-2a', angle:180 },
      complete:{ texture:'room-2a', angle:180, style:_wallAndGround }
    }},
  ],

});
