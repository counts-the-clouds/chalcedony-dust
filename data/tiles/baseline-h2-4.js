TileRegistry.register('baseline-h2-4', {

  segments:[
    { type:_hall, exits:[_n], graphics:{
      incomplete:{ texture:'rough-hall-1b' },
      complete:{ texture:'hall-1b', style:_wallAndGround }
    }},
    { type:_hall, exits:[_w], graphics:{
      incomplete:{ texture:'rough-hall-1b', angle:270 },
      complete:{ texture:'hall-1b', angle:270, style:_wallAndGround }
    }},
    { type:_node, exits:[], graphics:{
      complete:{ texture:'room-0a', style:_wallAndGround }
    }},
  ],

});
