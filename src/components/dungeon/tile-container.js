global.TileContainer = async function(tile) {

  const tileContainer = new PIXI.Container();
  tileContainer.eventMode = 'dynamic';
  tileContainer.height = 64;
  tileContainer.width = 64;

  const layers = tile.getLayers();
  const textures = await Promise.all(layers.map(async layer => {
    return await PIXI.Assets.load(layer.background);
  }));

  layers.forEach((layer,i) => {
    tileContainer.addChild(new PIXI.Sprite(textures[i]));
  });

  return tileContainer;

};