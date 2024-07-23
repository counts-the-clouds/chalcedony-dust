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
    $leftTrim.rect(0,0,20,60);
    $leftTrim.fill({ color:'rgb(50,58,50)' });

    $rightTrim = new PIXI.Graphics();
    $rightTrim.rect(200,0,20,60);
    $rightTrim.fill({ color:'rgb(50,58,50)' });

    $center = new PIXI.Graphics();
    $center.rect(0,10,200,50);
    $center.fill({ color:'rgb(40,50,40)' });

    $shelf = new PIXI.Container();
    $shelf.addChild($center);
    $shelf.addChild($leftTrim);
    $shelf.addChild($rightTrim);

    application.stage.addChild($shelf)

    positionShelf();
  }

  // We should call this to rebuild the shelf if the tile shelf state changes.
  async function refresh() {
    TileShelf.getShelf().forEach(tile => {
      const tileContainer = TileContainer(tile);
    });
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
