TileRegistry.register('baseline-h2-r2-1', {

  segments:[
    { type:_room, exits:[_s,_e], graphics:{
      incomplete:{ texture:'rough-room-2b', angle:180 },
      complete:{ texture:'room-2b', angle:180, style:_wallAndGround }
    }},
    { type:_hall, exits:[_n,_w], graphics:{
      incomplete:{ texture:'rough-hall-2b' },
      complete:{ texture:'hall-2b', style:_wallAndGround }
    }},
  ],

});
