TileRegistry.register('baseline-h2-r2-0', {

  segments:[
    { type:TileType.hall, exits:[_n], graphics:{ shape:'hall-medium' }},
    { type:TileType.hall, exits:[_s], graphics:{ shape:'hall-medium', rotate:2 }},
    { type:TileType.room, exits:[_e,_w], graphics:{ shape:'room-across-narrow' }},
  ],

});
