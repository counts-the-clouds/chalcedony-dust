TileRegistry.register('baseline-h3-2', {

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
    { type:_node, exits:[], graphics:{
      complete:{ texture:'room-0a', style:_wallAndGround }
    }},
  ],

});
