global.CellContainer = async function(chunk,x,y) {

  const TS = _tileSize;
  const HS = Math.floor(_tileSize/2);

  const background = new PIXI.Sprite(await DungeonAssets.randomTileBackground());
  background.x = HS;
  background.y = HS;
  background.pivot.x = HS;
  background.pivot.y = HS;
  background.angle = Random.upTo(4) * 90;

  const darkBox = new PIXI.Sprite(await PIXI.Assets.load('dark-box'));

  const text = new PIXI.Text({ text:`(${x},${y})`, style:{
    fontFamily:'roboto',
    align:'center',
    fontSize:20,
    fill:0xaa9988
  }});

  text.x = HS - (text.width/2);
  text.y = HS - (text.height/2);

  const tile = new PIXI.Container();
  tile.addChild(background);
  tile.addChild(darkBox);
  tile.addChild(text);
  tile.x = HS+(TS*x);
  tile.y = HS+(TS*y) * -1;
  tile.pivot.x = tile.width/2;
  tile.pivot.y = tile.height/2;

  chunk.addChild(tile);

  return tile;
}
