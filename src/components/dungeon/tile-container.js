global.TileContainer = async function(tile) {

  const $tile = tile;

  const data = $tile.getTileData();
  const layers = $tile.getLayers();

  console.log($tile.pack())
  console.log('    Data',data)
  console.log('    Layers',layers)

  return Object.freeze({

  });

};