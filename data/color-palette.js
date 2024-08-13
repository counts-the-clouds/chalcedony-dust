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
      incomplete:{
        dark: '#272727',
        base: '#373737',
        light: '#474747',
      },
      complete:{
        dark: '#493e36',
        base: '#726156',
        light: '#a28b7b',
        select: '#7b6e8a',
      }
    },
    room:{
      incomplete:{
        dark: '#303030',
        base: '#474747',
        light: '#656565',
      },
      complete:{
        dark: '#303142',
        base: '#4d4f68',
        light: '#6e7094',
        select: '#5a5e95',
      }
    },
    core:{
      complete: {
        dark: '#331f2f',
        base: '#4e364c',
        light: '#6f4d6c',
        select: '#5e4784',
      }
    },
    node:{
      incomplete: {
        dark: '#303030',
        base: '#404040',
        light: '#505050',
      },
      complete: {
        dark: '#331f20',
        base: '#523536',
        light: '#754b4d',
        select: '#5e4777',
      }
    },
    resource:{
      incomplete: {
        dark: '#FF0000', // Should never be incomplete, but is.
        base: '#FF0000',
        light: '#FF0000',
        select: '#FF0000',
      },
      complete: {
        dark: '#2a3020',
        base: '#454e36',
        light: '#626f4d',
        select: '#525c76',
      }
    }
  },

  viewport: {
    guides: 'rgb(100,25,25)',
  }

});


