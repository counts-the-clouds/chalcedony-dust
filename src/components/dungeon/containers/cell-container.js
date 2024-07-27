global.CellContainer = function(x,y,coordinates) {

  const TS = _tileSize;
  const HS = Math.floor(_tileSize/2);

  const $coordinates = coordinates;
  const $cellContainer = new Pixi.Container();

  let $background;
  let $tileContainer;

  function getID() { return $cellContainer.accessibleHint; }
  function getCellContainer() { return $cellContainer; }
  function getCoordinates() { return $coordinates; }
  function getPosition() { return $cellContainer.getGlobalPosition(); }

  function buildContainer() {
    $background = new Pixi.Graphics();
    $background.label = 'background';

    $cellContainer.eventMode = 'dynamic';
    $cellContainer.label = 'CellContainer';
    $cellContainer.addChild($background);
    $cellContainer.x = (TS*x);
    $cellContainer.y = (TS*y);
    $cellContainer.pivot.x = $cellContainer.width/2 - HS;
    $cellContainer.pivot.y = $cellContainer.height/2 - HS;
    $cellContainer.accessibleHint = `${coordinates.gx}:${coordinates.gy}`

    resetBackgroundColor();
    buildDevelopmentGuides();

    return $cellContainer;
  }

  function buildDevelopmentGuides() {
    if (Environment.isDevelopment) {
      const border = new Pixi.Graphics();
      border.rect(0, 0, TS, TS);
      border.stroke({color: 'rgb(60,80,100,0.3)'});
      border.fill({color: 'rgb(60,80,100,0.01)'});

      const text = new Pixi.Text({
        text: `(${$coordinates.gx},${$coordinates.gy})`, style: {
          fontFamily: 'roboto',
          align: 'center',
          fontSize: 20,
          fill: 'rgba(110,130,150,0.3)'
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
    $cellContainer.addChild($tileContainer.getTileContainer());

    if (tile.getRotation() > 0) {
      $tileContainer.getTileContainer().angle = tile.getRotation() * 90;
    }
  }

  function resetBackgroundColor() {
    $background.rect(0,0,TS,TS);
    $background.fill('rgba(50,60,70,0.05)');
  }

  function setBackgroundColor(color) {
    $background.rect(0,0,TS,TS);
    $background.fill(color);
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
    resetBackgroundColor,
    setBackgroundColor,
  });
}
