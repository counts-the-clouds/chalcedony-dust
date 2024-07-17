TileRegistry.register('dungeon-core', {

  edges:{
    n: _stone,
    s: _hall,
    e: _room,
    w: _room,
  },

  segments:[
    { type:'floor', exits:[], forms:{
      base:{ background:'tiles/core-room-floor.png' }
    }},

    { type:_room, exits:[_e,_w], forms:{
      incomplete:{ background:'tiles/core-room-incomplete.png' }
    }},

    { type:_hall, exits:[_s], forms:{
      incomplete:{ background:'tiles/core-hall-incomplete.png' }
    }},

    { type:'core', exits:[], forms:{
      base:{ background:'tiles/core-room-core.png' }
    }},
  ],

});
