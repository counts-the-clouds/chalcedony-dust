TileRegistry.register('baseline-h1-r3-n1-0', {

  segments:[
    { type:TileType.hall, exits:[_n], graphics:{ shape:'hall-medium' }},
    { type:TileType.room, exits:[_s,_e,_w], graphics:{ shape:'room-tee-notch', rotate:2 }},
    { type:TileType.node, exits:[], graphics:{ shape:'node-large' }},
  ],

});
