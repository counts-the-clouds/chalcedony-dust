TileRegistry.register('dungeon-core', {

  clock: { code:'generate-tile' },

  segments:[
    { type:TileType.hall, exits:[_n], graphics:{ shape:'hall-short' }},
    { type:TileType.hall, exits:[_s], graphics:{ shape:'hall-short', rotate:2 }},
    { type:TileType.room, exits:[_e], graphics:{ shape:'room-short', rotate:1 }},
    { type:TileType.room, exits:[_w], graphics:{ shape:'room-short', rotate:3 }},
    { type:TileType.core, exits:[], graphics:{ shape:'core' }},
  ]

});
