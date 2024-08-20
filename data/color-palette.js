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
    hall:{
      incomplete: '#373737',
      complete: '#726156',
      building: '#493e36',
      constructed: '#a28b7b',
      select: '#7b6e8a',
    },
    room:{
      incomplete: '#474747',
      complete: '#4d4f68',
      building: '#303142',
      constructed: '#6e7094',
      select: '#5a5e95',
    },
    core:{
      complete: '#4e364c',
      select: '#5e4784',
    },
    node:{
      incomplete: '#404040',
      complete: '#523536',
      select: '#5e4777',
    },
    resource:{
      complete: '#454e36',
      select: '#525c76',
    }
  },

  viewport: {
    guides: 'rgb(100,25,25)',
  }

});


