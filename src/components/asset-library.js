global.AssetLibrary = (function() {

  const TEXTURE_NAMES = [
    'cell-inner-highlight-1',
    'cell-inner-highlight-2c',
    'cell-inner-highlight-2s',
    'cell-inner-highlight-3',
    'cell-inner-highlight-4',
    'shadow-small',
  ]

  const $textures = {}

  async function init() {
    const tileElements = await compileAssets(`${APP}/assets/tile-elements`);

    Pixi.Assets.addBundle('tile-elements', tileElements);
    Pixi.Assets.addBundle('fonts', [
      { alias: 'roboto', src:`${APP}/assets/fonts/Roboto-Regular.ttf` },
    ]);

    await Pixi.Assets.loadBundle('tile-elements');
    await Pixi.Assets.loadBundle('fonts');

    await Promise.all(TEXTURE_NAMES.map(async name => {
      $textures[name] = await Pixi.Assets.load(name);
    }));
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

  function fetch(name) {
    return $textures[name];
  }

  return {
    init,
    fetch,
  }

})();
