TileRegistry.register('dungeon-core', {

  clock: { code:'generate-tile' },

  segments:[
    { type:_hall, exits:[_n], graphics:{
      incomplete: { texture:'rough-hall-1a' },
      complete:{ texture:'hall-1b', style:_wallAndGround },
    }},
    { type:_hall, exits:[_s], graphics:{
      incomplete: { texture:'rough-hall-1a', angle:180 },
      complete:{ texture:'hall-1b', angle:180, style:_wallAndGround }
    }},
    { type:_room, exits:[_e], graphics:{
      incomplete: { texture:'rough-room-1e', angle:90 },
      complete:{ texture:'room-1e', angle:90, style:_wallAndGround }
    }},
    { type:_room, exits:[_w], graphics:{
      incomplete: { texture:'rough-room-1e', angle:270 },
      complete:{ texture:'room-1e', angle:270, style:_wallAndGround }
    }},
    { type:_core, exits:[], graphics:{
      complete:{ texture:'room-0b', style:_wallAndGround }
    }},
  ],

});
