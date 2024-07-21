global.ChunkContainer = function(chunkID, chunk) {

  // TODO: We need to set an extent as we add chunks so that we know how far
  //       we should be able to pan the view.
  //
  // TODO: We only need to include the text and chunk boundry box in
  //       development mode, or eventually just remove it completely.
  //
  const chunkLocation = chunk.getChunkLocation();
  const chunkSize = _tileSize * 16;

  const graphics = new PIXI.Graphics();
  graphics.rect(0,0,chunkSize,chunkSize);
  graphics.fill('rgba(50,25,0,0.1)');
  graphics.stroke({ color:'rgb(100,80,60,0.5)' });

  const text = new PIXI.Text({ text:`Chunk${chunkID}`, style: {
    fontFamily:'roboto',
    fontSize:200,
    fill:'rgba(150,140,130,0.15)',
  }});
  text.x = (chunkSize/2) - (text.width/2);
  text.y = (chunkSize/2) - (text.height/2);

  const container = new PIXI.Container();
  container.addChild(graphics);
  container.addChild(text);
  container.x = chunkLocation.x * chunkSize;
  container.y = chunkLocation.y * chunkSize;

  return Object.freeze({
    chunkID,
    chunk,
    container,
  });
}
