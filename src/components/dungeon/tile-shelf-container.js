window.TileShelfContainer = (function() {

  let $shelf;
  let $leftTrim;
  let $rightTrim;
  let $center;

  function init() {
    window.addEventListener("resize", handleResize);
  }

  // TODO: We'll just draw the tile shelf with a graphics object for now.
  //       Eventually we'll want this to be a sprite with "Good Graphics".
  //       Might even render something out in Blender. Still thinking about
  //       the overall look of things.
  async function create(application) {
    $leftTrim = new PIXI.Graphics();
    $leftTrim.rect(0,20,20,60);
    $leftTrim.stroke({ color:'rgb(50,58,50)' });
    $leftTrim.fill({ color:'rgb(10,12,10)' });

    $rightTrim = new PIXI.Graphics();
    $rightTrim.rect(200,20,20,60);
    $rightTrim.stroke({ color:'rgb(50,58,50)' });
    $rightTrim.fill({ color:'rgb(10,12,10)' });

    $center = new PIXI.Graphics();
    $center.rect(0,30,200,50);
    $center.stroke({ color:'rgb(40,50,40)' });
    $center.fill({ color:'rgb(10,12,10)' });

    $shelf = new PIXI.Container();
    $shelf.addChild($center);
    $shelf.addChild($leftTrim);
    $shelf.addChild($rightTrim);

    application.stage.addChild($shelf)

    positionShelf();
  }

  // We should call this to rebuild the shelf if the tile shelf state changes.
  async function refresh() {
    await Promise.all(TileShelf.getShelf().map(async tile => {
      const container = await TileContainer(tile);
      container.x = ($shelf.width/2) - 32;
      container.y = 0;
      $shelf.addChild(container);
    }));

    positionShelf();
  }

  function handleResize() {
    positionShelf();
  }

  function positionShelf() {
    if ($shelf) {
      const screen = DungeonView.getDimensions();

      $shelf.y = screen.height - $shelf.height;
      $shelf.x = (screen.width/2) - ($shelf.width/2);
    }
  }

  return Object.freeze({
    init,
    create,
    refresh,
  })

})();
