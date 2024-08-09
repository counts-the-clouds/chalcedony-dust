global.TileLayer = function(segment) {

  const $segment = segment;
  const $graphics = $segment.getSegmentData().graphics;
  const $shapeContainer = buildContainer();
  const $drawing = buildDrawing();

  $shapeContainer.addChild($drawing);
  if ($segment.getState() === _complete) {
    wireEvents()
  }

  function buildContainer() {
    const container = new Pixi.Container();
    container.height = _tileSize;
    container.width = _tileSize;
    container.x = _tileSize/2;
    container.y = _tileSize/2;
    container.pivot.x = _tileSize/2;
    container.pivot.y = _tileSize/2;
    container.angle = ($graphics.rotate||0)*90;
    return container;
  }

  // There's sometimes a gap between tiles due to floating point rounding
  // errors I'm guessing. Adding a slight scale to the drawings should
  // eliminate these gaps. Not sure where the misalignment between tiles is
  // coming from. My math is perfect after all.
  function buildDrawing() {
    try {
      const drawing = new Pixi.Graphics();
      drawing.height = _tileSize;
      drawing.width = _tileSize;
      drawing.scale = 1.01;

      ShapeRegistry.lookup($graphics.shape).draw(drawing, $segment);

      return drawing;
    }
    catch(error) {
      logError(`Cannot Build Layer for ${segment}:${segment.getTileCode()}`,error,{
        system:'TileLayer'
      });
    }
  }

  function wireEvents() {
    const feature = $segment.getFeature();
    feature.addSegmentDrawing($drawing);

    $drawing.eventMode = 'dynamic';
    $drawing.onmouseenter = feature.onMouseEnter;
    $drawing.onmouseleave = feature.onMouseLeave;
    $drawing.onmousedown = feature.onMouseDown;
  }

  function getShapeContainer() {
    return $shapeContainer;
  }

  return Object.freeze({
    getShapeContainer
  });

}