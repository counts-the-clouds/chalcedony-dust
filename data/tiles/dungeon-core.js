TileRegistry.register('dungeon-core', {

  edges:{
    n: _stone,
    s: _hall,
    e: _room,
    w: _room,
  },

  segments:[
    { type:'floor', exits:[], forms:{
      base:{ background:'cell-background' }
    }},

    { type:_room, exits:[_e,_w], forms:{
      incomplete:{ background:'room-2s' }
    }},

    { type:_hall, exits:[_s], forms:{
      incomplete:{ background:'hall-1', angle:180 }
    }},

    { type:'core', exits:[], forms:{
      base:{ background:'core' }
    }},
  ],

});
