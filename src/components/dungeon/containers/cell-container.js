global.CellContainer = function(x,y,coordinates) {

  const TS = _tileSize;
  const HS = Math.floor(_tileSize/2);

  const $coordinates = coordinates;
  const $cellContainer = new Pixi.Container();

  let $tileContainer;

  function getID() { return $cellContainer.accessibleHint; }
  function getCellContainer() { return $cellContainer; }
  function getCoordinates() { return $coordinates; }
  function getPosition() { return $cellContainer.getGlobalPosition(); }

  function buildContainer() {
    const palette = ExtraRegistry.lookup('ColorPalette').cell;
    const background = new Pixi.Graphics();
    background.label = 'background';
    background.rect(0,0,TS,TS);
    background.fill(palette.background);

    $cellContainer.eventMode = 'dynamic';
    $cellContainer.label = 'CellContainer';
    $cellContainer.addChild(background);
    $cellContainer.x = (TS*x);
    $cellContainer.y = (TS*y);
    $cellContainer.pivot.x = $cellContainer.width/2 - HS;
    $cellContainer.pivot.y = $cellContainer.height/2 - HS;
    $cellContainer.accessibleHint = `${coordinates.gx}:${coordinates.gy}`

    buildDevelopmentGuides();

    return $cellContainer;
  }

  function buildDevelopmentGuides() {
    if (false && Environment.isDevelopment) {
      const palette = ExtraRegistry.lookup('ColorPalette').cell;

      const border = new Pixi.Graphics();
      border.rect(0, 0, TS, TS);
      border.stroke({ color:palette.guides.stroke });
      border.fill({color:palette.guides.fill });

      const text = new Pixi.Text({
        text: `(${$coordinates.gx},${$coordinates.gy})`, style: {
          fontFamily: 'roboto',
          align: 'center',
          fontSize: 20,
          fill: palette.guides.text,
        }
      });

      text.x = HS - (text.width / 2);
      text.y = HS - (text.height / 2);

      $cellContainer.addChild(border);
      $cellContainer.addChild(text);
    }
  }

  function getTileContainer() { return $tileContainer; }
  function getTile() { return $tileContainer ? $tileContainer.getTile() : null; }

  async function setTile(tile) {
    if ($tileContainer != null) {
      throw `Cell(${getID()}) already contains a tile.`
    }

    $tileContainer = await TileContainer(tile);
    $tileContainer.setPosition(HS,HS);

    // This is pretty nasty actually. Let's find a better way to add clocks to
    // tiles. Removed adding the clock to the manager from this. This should
    // just adjust the ui.
    // await $tileContainer.enableClock();

    $cellContainer.addChild($tileContainer.getTileContainer());

    if (tile.getRotation() > 0) {
      $tileContainer.getTileContainer().angle = tile.getRotation() * 90;
    }
  }

  buildContainer();

  return Object.freeze({
    getID,
    getCellContainer,
    getCoordinates,
    getPosition,
    getTileContainer,
    getTile,
    setTile,
  });
}
