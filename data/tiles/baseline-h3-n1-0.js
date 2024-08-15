TileRegistry.register('baseline-h3-n1-0', {

  segments:[
    { type:TileType.hall, exits:[_n], graphics:{ shape:'hall-medium' }},
    { type:TileType.hall, exits:[_e], graphics:{ shape:'hall-medium', rotate:1 }},
    { type:TileType.hall, exits:[_w], graphics:{ shape:'hall-medium', rotate:3 }},
    { type:TileType.node, exits:[], graphics:{ shape:'node-small' }},
  ],

});
