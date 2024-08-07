global.TileLayer = function(segment) {

  const $segment = segment;
  const $graphics = $segment.getSegmentData().graphics;
  const $drawing = ShapeRegistry.lookup($graphics.shape).draw(buildDrawing(), $segment);
  const $shapeContainer = buildContainer();

  if ($segment.getState() === _complete) {
    wireEvents()
  }

  function buildDrawing() {
    const drawing = new Pixi.Graphics();
    drawing.height = _tileSize;
    drawing.width = _tileSize;
    return drawing;
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
    container.addChild($drawing);
    return container;
  }

  function wireEvents() {
    const palette = ExtraRegistry.lookup('ColorPalette').segments[$segment.getType()].complete;

    const normalTint = $drawing.tint;

    $drawing.eventMode = 'dynamic';
    $drawing.onmouseenter = () => { $drawing.tint = palette.select; }
    $drawing.onmouseleave = () => { $drawing.tint = normalTint; }
    $drawing.onmousedown = () => { console.log(`Click:${$segment}`) }
  }

  function getShapeContainer() {
    return $shapeContainer;
  }

  return Object.freeze({
    getShapeContainer
  })

}