global.CellContainer = function(x,y,tile,options) {
  const TS = _tileSize;
  const HS = Math.floor(_tileSize/2);

  const gx = options.coordinates.gx
  const gy = options.coordinates.gy

  const border = new PIXI.Graphics();
  border.rect(0,0,TS,TS);
  border.stroke({ color:'rgb(60,80,100,0.3)' });
  border.fill({ color:'rgb(60,80,100,0.01)' });

  const background = options.background;
  background.x = HS;
  background.y = HS;
  background.pivot.x = HS;
  background.pivot.y = HS;
  background.angle = Random.upTo(4) * 90;

  const text = new PIXI.Text({ text:`(${gx},${gy})`, style:{
    fontFamily: 'roboto',
    align: 'center',
    fontSize: 20,
    fill: 'rgba(110,130,150,0.3)'
  }});

  text.x = HS - (text.width/2);
  text.y = HS - (text.height/2);

  const cell = new PIXI.Container();
  cell.eventMode = 'dynamic';
  // cell.addChild(background);
  // cell.addChild(options.darkBox);
  cell.addChild(border);
  cell.addChild(text);
  cell.x = (TS*x);
  cell.y = (TS*y);
  cell.pivot.x = cell.width/2 - HS;
  cell.pivot.y = cell.height/2 - HS;

  // cell.on('mouseover', event => { console.log(` --> (${gx},${gy})`); });
  // cell.on('mouseleave', event => { console.log(` <-- (${gx},${gy})`); });

  return cell;
}


