ExtraRegistry.register('ColorPalette',{


  cell:{
    background: 'rgba(50,60,70,0.05)',

    guides:{
      stroke: 'rgb(60,80,100,0.3)',
      fill: 'rgb(60,80,100,0.01)',
      text: 'rgba(110,130,150,0.3)',
    }
  },

  chunk:{
    guides:{
      stroke: 'rgb(100,80,60,0.4)',
      text: 'rgba(150,140,130,0.4)',
    }
  },

  clock:{
    arc: 'rgb(255,255,255)',
    shadow: 'rgba(0,0,0,0.75)'
  },

  tile:{
    background: 'rgb(20,20,20)',
  },

  segments:{
    incomplete: {
      hall: 'rgb(120,120,120)',
      room: 'rgb(140,140,140)',
    },
    complete: {
      hall: {
        ground: 'rgb(200,180,160)',
        wall: 'rgb(200,180,160)',
      },
      room: {
        ground: 'rgb(160,180,200)',
        wall: 'rgb(160,180,200)',
      },
      core: {
        ground: 'rgb(110,130,150)',
        wall: 'rgb(210,230,250)',
      },
      node: {
        ground: 'rgb(60,60,60)',
        wall: 'rgb(80,80,80)',
      }
    }
  },

  viewport: {
    guides: 'rgb(100,25,25)',
  }

});


