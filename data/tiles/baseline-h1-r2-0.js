TileRegistry.register('baseline-h1-r2-0', {

  segments:[
    { type:_hall, exits:[_n], graphics:{
      incomplete:{ texture:'rough-hall-1b' },
      complete:{ texture:'hall-1b', style:_wallAndGround }
    }},
    { type:_room, exits:[_e,_w], graphics:{
      incomplete:{ texture:'rough-room-2e' },
      complete:{ texture:'room-2e', style:_wallAndGround }
    }},
  ],

});
