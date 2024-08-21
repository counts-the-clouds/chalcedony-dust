global.TileLayer = function(segment) {

  const $segment = segment;
  const $graphics = $segment.getGraphics()
  const $shapeContainer = buildContainer();
  const $drawing = buildDrawing();

  let $pulse;

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

    $drawing.eventMode = 'dynamic';
    $drawing.onmouseenter = feature.onMouseEnter;
    $drawing.onmouseleave = feature.onMouseLeave;
    $drawing.cursor = 'pointer';
    $drawing.onclick = () => { FeatureWindows.open(feature) };
  }

  function getShapeContainer() { return $shapeContainer; }
  function applyTint(tint) { $drawing.tint = tint; }

  // === Animation =============================================================

  // Because the same pulseData object is used in every segment, it's built in
  // the feature. It should have the keys { value, rLow, gLow, bLow, rRange,
  // gRange, bRange } The pulse will cycle the drawing's tint between:
  //      rgb(rLow, gLow, bLow) and rgb(rLow+rRange, gLow+gRange, bLow+bRange)
  function startPulse(pulseData) {
    $drawing.cursor = null;
    $pulse = pulseData;
  }

  function stopPulse() {
    $drawing.cursor = 'pointer';
    $pulse = null;
  }

  // We can just assume we'll be getting around 60 pulses / second. Making the
  // pulsing be frame rate locked is probably fine.
  function updatePulse() {
    if ($pulse) {
      $pulse.value += 1/60;

      const phase = (Math.sin($pulse.value) + 1)/2;
      const r = Math.floor($pulse.rLow + (phase * $pulse.rRange));
      const g = Math.floor($pulse.gLow + (phase * $pulse.gRange));
      const b = Math.floor($pulse.bLow + (phase * $pulse.bRange));

      $drawing.tint = `rgb(${r},${g},${b})`;
    }
  }

  const $self = Object.freeze({
    applyTint,
    startPulse,
    stopPulse,
    updatePulse,
    getShapeContainer,
  });

  $segment.setTileLayer($self);

  return $self;
}
