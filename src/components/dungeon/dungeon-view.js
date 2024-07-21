global.DungeonView = (function() {

  let $application;

  function init() {
    window.addEventListener("resize", handleResize);
  }

  async function open() {
    await DungeonAssets.loadAssets();

    MainContent.setMainContent('views/dungeon-view.html');
    createApplication();
  }

  function close() {
    $application.destroy();
    $application = null;
  }







  // function reset() {
  //   hide();

  //   if ($application && $application.stage) {
  //     $application.stage.removeChild($tileField);
  //     $application.stage.removeChild($partyGlyph);
  //   }

  //   if ($partyGlyph) { $partyGlyph.destroy({ children:true }); }
  //   if ($tileField) { $tileField.destroy({ children:true }); }

  //   $partyGlyph = null;
  //   $tileField = null;
  //   $tileGraphics = null;
  //   $tileSource = null;
  //   $location = null;
  // }

  async function createApplication() {

    $application = new PIXI.Application();
    await $application.init({
      antialias: true,
      resizeTo: window,
    });

    X.first("#dungeonCanvas").appendChild($application.canvas)

    await buildTileGrid();
  }

  async function buildTileGrid() {
    for (let x=0; x<10; x++) {
      for (let y=0; y<10; y++) {
        await buildTile(x,y);
      }
    }
  }

  async function buildTile(x,y) {
    const background = new PIXI.Sprite(await DungeonAssets.randomTileBackground());
    background.x = 64;
    background.y = 64;
    background.pivot.x = 64;
    background.pivot.y = 64;
    background.angle = Random.upTo(4) * 90;

    const darkBox = new PIXI.Sprite(await PIXI.Assets.load('dark-box'));

    const text = new PIXI.Text({ text:`(${x},${y})`, style:{
      fontFamily:'roboto',
      align:'center',
      fontSize:20,
      fill:0xaa9988
    }});

    text.x = 64 - (text.width/2);
    text.y = 64 - (text.height/2);

    const tile = new PIXI.Container();
    tile.addChild(background);
    tile.addChild(darkBox);
    tile.addChild(text);
    tile.x = 64+(128*x);
    tile.y = 64+(128*y);
    tile.pivot.x = tile.width / 2;
    tile.pivot.y = tile.height / 2;

    tile.scale = 0.90;

    $application.stage.addChild(tile);
  }

  function handleResize() {
    // if ($tileField) {
    //   $application.resize();
    //   positionField();
    // }
  }

  // === Set Scale and Position ================================================

  function setLocation(point) { $location = point; }

  // TODO: Eventually we need to handle each move action slightly differently.
  //       The climb changes the z-level so it might be interesting to fade one
  //       layer in while the other fades out. Moving should tween the position
  //       so that it looks like the party is taking a step, and warp should
  //       have some kind of magical effect.

  function move(response) {
    // $location = response.location;
    // positionField();
  }

  function moveTo(direction) {
    // move({ location: $location.go(direction) });
  }

  function changeLevel(direction) {
    // if ($location.go(direction).z < $tileSource.layerOffset) { return false; }
    // if ($location.go(direction).z >= $tileSource.layerOffset + $tileSource.layers.length) { return false; }

    // $location = $location.go(direction);
    // updateTileVisibility();
  }

  function zoomIn() {
    // if ($scale > 0) {
    //   $scale -= 1;
    //   positionField();
    // }
  }

  function zoomOut() {
    // if ($scale < ScaleFactors.length-1) {
    //   $scale += 1;
    //   positionField();
    // }
  }


  // === Positioning ===========================================================
  // The map scale, position, and tile visibility needs to be updated every
  // time the location is updated.

  function positionField() {
    // $tileField.x = $application.screen.width / 2;
    // $tileField.y = $application.screen.height / 2;

    // $partyGlyph.x = $tileField.x;
    // $partyGlyph.y = $tileField.y;

    // $tileField.pivot.x = $location.x * TileSize;
    // $tileField.pivot.y = $location.y * TileSize;

    // $tileField.scale.set(ScaleFactors[$scale]);
    // $partyGlyph.scale.set(ScaleFactors[$scale]);

    // updateTileVisibility();
  }


  // Only tiles on the current Z-Level and within the bounds of the window
  // should be rendered.
  function updateTileVisibility() {
    // let scaleFactor = ScaleFactors[$scale];
    // let xTileCount = Math.ceil($application.screen.width / (TileSize * scaleFactor) / 2);
    // let yTileCount = Math.ceil($application.screen.height / (TileSize * scaleFactor) / 2);

    // let xMin = $location.x - xTileCount;
    // let xMax = $location.x + xTileCount;
    // let yMin = $location.y - yTileCount;
    // let yMax = $location.y + yTileCount;

    // $tileGraphics.forEach(tile => {
    //   let tileZ = tile.index.z + $tileSource.layerOffset

    //   tile.graphics.renderable = true

    //   if (tile.index.x < xMin) { tile.graphics.renderable = false; }
    //   if (tile.index.x > xMax) { tile.graphics.renderable = false; }
    //   if (tile.index.y < yMin) { tile.graphics.renderable = false; }
    //   if (tile.index.y > yMax) { tile.graphics.renderable = false; }
    //   if (tileZ != $location.z) { tile.graphics.renderable = false; }
    // });
  }



  return Object.freeze({
    init,
    open,
  });

})();