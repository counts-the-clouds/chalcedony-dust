TileRegistry.register('baseline-h1-r3-1', {

  segments:[
    { type:_hall, exits:[_n], graphics:{
      incomplete:{ texture:'rough-hall-1c' },
      complete:{ texture:'hall-1c', style:_wallAndGround }
    }},
    { type:_room, exits:[_s,_e,_w], graphics:{
      incomplete:{ texture:'rough-room-3b' },
      complete:{ texture:'room-3b', style:_wallAndGround }
    }},
    { type:_node, exits:[], graphics:{
      complete:{ texture:'room-0a', style:_wallAndGround }
    }},
  ],

});
