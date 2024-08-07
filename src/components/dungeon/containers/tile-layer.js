global.TileLayer = (function() {

  function build(segment) {
    const graphics = segment.getSegmentData().graphics;

    const container = new Pixi.Container();
    // container.height = _tileSize;
    // container.width = _tileSize;
    // container.pivot.x = _tileSize/2;
    // container.pivot.y = _tileSize/2;
    // container.angle = (graphics.rotation||0)*90;

    const shape = ShapeRegistry.lookup(graphics.shape);
    if (typeof shape.draw === 'function') {
      const drawing = new Pixi.Graphics();
      drawing.height = _tileSize;
      drawing.width = _tileSize;
      shape.draw(drawing);
      drawing.fill('rgb(255,255,255)');
      drawing.tint = 'rgb(120,100,80)';
      drawing.stroke({ width:5, color:'rgb(80,60,40)' })

      drawing.hitArea = shape.getHitArea();
      drawing.eventMode = 'dynamic';
      drawing.onmouseenter = () => { drawing.tint = 'rgb(140,180,220)'; }
      drawing.onmouseleave = () => { drawing.tint = 'rgb(120,100,80)'; }

      container.addChild(drawing);
    }

    return container;
  }



  return Object.freeze({
    build
  })

})()