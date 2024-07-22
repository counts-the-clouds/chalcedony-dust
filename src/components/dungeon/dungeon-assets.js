global.DungeonAssets = (function() {

  let $tileBackgrounds;
  let $tileElements;

  async function addAssets() {
    $tileBackgrounds = await compileAssets(`${APP}/assets/tile-backgrounds`);
    $tileElements = await compileAssets(`${APP}/assets/tile-elements`);

    PIXI.Assets.addBundle('tile-backgrounds', $tileBackgrounds);
    PIXI.Assets.addBundle('tile-elements', $tileElements);

    PIXI.Assets.addBundle('fonts', [
      { alias: 'roboto', src:`${APP}/assets/fonts/Roboto-Regular.ttf` },
    ]);
  }

  async function loadAssets() {
    await PIXI.Assets.loadBundle('tile-backgrounds');
    await PIXI.Assets.loadBundle('tile-elements');
    await PIXI.Assets.loadBundle('fonts');
  }

  async function randomTileBackground() {
    return await PIXI.Assets.load(Random.from($tileBackgrounds).alias);
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
    randomTileBackground,
  }

})();
