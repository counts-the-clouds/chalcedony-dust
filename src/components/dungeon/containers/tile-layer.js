global.TileLayer = function(segment) {

  const $segment = segment;
  const $graphics = $segment.getGraphics()
  const $shapeContainer = buildContainer();
  const $drawing = buildDrawing();

  $shapeContainer.addChild($drawing);
  if ($segment.getState() !== FeatureState.incomplete) {
    wireEvents();
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
      logError(`Cannot Build Layer for ${segment}:${segment.getTile().getCode()||'custom'}`,error,{
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
    $drawing.onclick = () => { FeatureWindows.open(feature) };
  }

  function getShapeContainer() {
    return $shapeContainer;
  }

  // === Animation =============================================================

  // TODO: Figure out how to make a nice pulse animation given the completed
  //       percentage. (may want to just call this with the delta time instead)

  function startPulse() {
    console.log("Start pulse")
    // $drawing.tint
  }

  function updatePulse(percent) {
    console.log("Update Progress...",percent)
  }

  const $self = Object.freeze({
    startPulse,
    updatePulse,
    getShapeContainer,
  });

  $segment.setTileLayer($self);

  return $self;
}