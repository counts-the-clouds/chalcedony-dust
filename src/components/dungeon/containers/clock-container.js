global.ClockContainer = async function() {

  const $shadow = new Pixi.Graphics();
  $shadow.height = _tileSize;
  $shadow.width = _tileSize;
  $shadow.filters = [new Pixi.BlurFilter({ strength:5, quality:1 })]

  const $arc = new Pixi.Graphics();
  $arc.height = _tileSize;
  $arc.width = _tileSize;

  const $container = new Pixi.Container();
  $container.addChild($shadow);
  $container.addChild($arc);

  updateClock(0);

  function getContainer() { return $container }

  function updateClock(percentage) {
    let min = 0;
    let max = (2 * Math.PI) * (percentage/100);

    min -= Math.PI/2;
    max -= Math.PI/2;

    $shadow.clear()
    $shadow.arc(_tileSize/2, _tileSize/2, 30, min, max);
    $shadow.stroke({ width:14, color:'rgba(0,0,0,0.75)' });

    $arc.clear()
    $arc.arc(_tileSize/2, _tileSize/2, 30, min, max);
    $arc.stroke({ width:10, color:'rgb(255,255,255)' });
  }

  return Object.freeze({
    getContainer,
    updateClock,
  });
}
