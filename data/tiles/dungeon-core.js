TileRegistry.register('dungeon-core', {

  clock: { code:'generate-tile' },

  segments:[
    { type:_hall, exits:[_n], graphics:{ shape:'hall-short' }},
    { type:_hall, exits:[_s], graphics:{ shape:'hall-short', rotate:2 }},
    { type:_room, exits:[_e], graphics:{ shape:'room-short', rotate:1 }},
    { type:_room, exits:[_w], graphics:{ shape:'room-short', rotate:3 }},
    { type:_core, exits:[], graphics:{ shape:'core' }},
  ]

});
