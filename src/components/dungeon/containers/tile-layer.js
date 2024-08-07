global.TileLayer = (function() {

  const white = 0xFFFFFF;

  function build(segment) {
    const palette = ExtraRegistry.lookup('ColorPalette').segments;
    const graphics = segment.getSegmentData().graphics;
    const type = segment.getType();
    const shape = ShapeRegistry.lookup(graphics.shape);

    const drawing = new Pixi.Graphics();
    drawing.height = _tileSize;
    drawing.width = _tileSize;

    const container = buildContainer(graphics,drawing);

    if (segment.getState() === _incomplete) {
      shape.drawBase(drawing);
      drawing.fill(white);
      drawing.tint = palette.incomplete[type];

      // TODO: Fade inward.

      // drawing.stroke({ width:5, color:'rgb(80,60,40)' })
    }

    if (segment.getState() === _complete) {
      shape.drawBase(drawing);
      drawing.fill(white);
      drawing.tint = palette.complete[type].ground;

      drawing.eventMode = 'dynamic';
      drawing.onmouseenter = () => { drawing.tint = 'rgb(140,180,220)'; }
      drawing.onmouseleave = () => { drawing.tint = 'rgb(120,100,80)'; }
      drawing.onmousedown = () => { console.log(`Click:${segment}`) }

      // TODO: Draw walls.
    }

    return container;
  }

  function buildContainer(graphics, drawing) {
    const container = new Pixi.Container();

    container.height = _tileSize;
    container.width = _tileSize;
    container.x = _tileSize/2;
    container.y = _tileSize/2;
    container.pivot.x = _tileSize/2;
    container.pivot.y = _tileSize/2;
    container.angle = (graphics.rotate||0)*90;
    container.addChild(drawing);

    return container;
  }

  return Object.freeze({
    build
  })

})()