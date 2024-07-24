global.CellContainer = function(x,y,coordinates) {

  const TS = _tileSize;
  const HS = Math.floor(_tileSize/2);

  const $coordinates = coordinates;
  const $cellContainer = new PIXI.Container();

  function buildContainer() {

    const background = new PIXI.Graphics();
    background.rect(0,0,TS,TS);
    background.fill('rgba(50,60,70,0.05)');

    $cellContainer.eventMode = 'dynamic';
    $cellContainer.addChild(background);
    $cellContainer.x = (TS*x);
    $cellContainer.y = (TS*y);
    $cellContainer.pivot.x = $cellContainer.width/2 - HS;
    $cellContainer.pivot.y = $cellContainer.height/2 - HS;

    buildDevelopmentGuides();

    return $cellContainer;
  }

  function buildDevelopmentGuides() {
    if (Environment.isDevelopment) {
      const border = new PIXI.Graphics();
      border.rect(0, 0, TS, TS);
      border.stroke({color: 'rgb(60,80,100,0.3)'});
      border.fill({color: 'rgb(60,80,100,0.01)'});

      const text = new PIXI.Text({
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

  return buildContainer();
}
