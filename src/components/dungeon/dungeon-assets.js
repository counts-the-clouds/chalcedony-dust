global.DungeonAssets = (function() {

  let $tileElements;
  let $tiles;

  async function addAssets() {
    $tileElements = await compileAssets(`${APP}/assets/tile-elements`);
    $tiles = await compileAssets(`${APP}/assets/tiles`);

    Pixi.Assets.addBundle('tile-elements', $tileElements);
    Pixi.Assets.addBundle('tiles', $tiles);

    Pixi.Assets.addBundle('fonts', [
      { alias: 'roboto', src:`${APP}/assets/fonts/Roboto-Regular.ttf` },
    ]);
  }

  async function loadAssets() {
    await Pixi.Assets.loadBundle('tile-backgrounds');
    await Pixi.Assets.loadBundle('tile-elements');
    await Pixi.Assets.loadBundle('tiles');
    await Pixi.Assets.loadBundle('fonts');
  }

  function compileAssets(directory) {
    return new Promise(resolve => {
      fs.readdir(directory, (error, files) => {
        resolve(files.map(file => {
          return {
            alias: file.substring(0, file.length-4),
            src: `${directory}/${file}`
          }
        }));
      });
    });
  }

  return {
    addAssets,
    loadAssets,
  }

})();
