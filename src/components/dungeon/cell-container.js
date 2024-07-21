global.CellContainer = function(x,y,tile,options) {
  const TS = _tileSize;
  const HS = Math.floor(_tileSize/2);

  const graphics = new PIXI.Graphics();
  graphics.rect(0,0,TS,TS);
  graphics.stroke({ color:'rgb(60,80,100,0.5)' });

  const background = options.background;
  background.x = HS;
  background.y = HS;
  background.pivot.x = HS;
  background.pivot.y = HS;
  background.angle = Random.upTo(4) * 90;

  const text = new PIXI.Text({ text:`(${options.coordinates.gx},${options.coordinates.gy})`, style:{
    fontFamily: 'roboto',
    align: 'center',
    fontSize: 20,
    fill: 'rgb(110,130,150)'
  }});

  text.x = HS - (text.width/2);
  text.y = HS - (text.height/2);

  const cell = new PIXI.Container();
  cell.addChild(background);
  cell.addChild(options.darkBox);
  cell.addChild(graphics);
  cell.addChild(text);
  cell.x = (TS*x);
  cell.y = (TS*y);
  cell.pivot.x = cell.width/2 - HS;
  cell.pivot.y = cell.height/2 - HS;

  return cell;
}
