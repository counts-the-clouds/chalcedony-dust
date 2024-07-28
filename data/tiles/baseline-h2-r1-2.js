TileRegistry.register('baseline-h2-r1-2', {

  edges:{
    n: _stone,
    s: _stone,
    e: _stone,
    w: _stone,
  },

  segments:[
    { type:_room, exits:[], forms:{
        incomplete:{ background:'room-2s' }
      }},

    { type:_hall, exits:[], forms:{
        incomplete:{ background:'hall-1', angle:180 }
      }},
  ],

});
