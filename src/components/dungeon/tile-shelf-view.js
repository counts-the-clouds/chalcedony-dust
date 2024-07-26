window.TileShelfView = (function() {

  // Normally I would make all of these consts, but PIXI will not be loaded
  // when this containing function is first run.
  let $dragArea;
  let $tileBag
  let $shelf;
  let $leftTrim;
  let $rightTrim;
  let $center;

  let $tileState;

  function init() {
    $tileState = {};
    window.addEventListener("resize", handleResize);
  }

  // TODO: We'll just draw the tile shelf with a graphics object for now.
  //       Eventually we'll want this to be a sprite with "Good Graphics".
  //       Might even render something out in Blender. Still thinking about
  //       the overall look of things.
  //
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

    $dragArea = new PIXI.Container();
    $dragArea.x = 0;
    $dragArea.y = 0;
    $dragArea.width = application.screen.width
    $dragArea.height = application.screen.height

    $tileBag = new PIXI.Graphics();
    $tileBag.rect(0,0,80,80)
    $tileBag.stroke({ color:'rgb(55,60,55)' });
    $tileBag.fill({ color:'rgb(12,15,12)' });

    application.stage.addChild($tileBag);
    application.stage.addChild($shelf);
    application.stage.addChild($dragArea);

    positionShelf();
    checkState()
  }

  function handleResize() {
    positionShelf();
    positionTiles();
  }

  // We should call this to rebuild the shelf if the tile shelf state changes.
  async function refresh() {
    await Promise.all(TileShelf.getShelf().map(async tile => {
      await addTile(tile)
    }));

    positionTiles();
  }

  function positionTiles() {
    Object.values($tileState).forEach(tileContainer => {
      tileContainer.setPosition(
        ($shelf.x + ($shelf.width/2)),
        ($shelf.y + 12));
    });
  }

  function positionShelf() {
    if ($shelf) {
      const screen = DungeonView.getDimensions();
      $shelf.y = screen.height - $shelf.height;
      $shelf.x = (screen.width/2) - ($shelf.width/2);

      $tileBag.y = screen.height - $tileBag.height;
      $tileBag.x = $shelf.x - $tileBag.width;
    }
  }

  function checkState() {
    if (GameState.hasFlag('tile-shelf-view.hide-tile-bag')) {
      $tileBag.renderable = false;
    }
  }

  async function addTile(tile) {
    const tileContainer = await TileContainer(tile);
    tileContainer.setSize(_tileSize/2);
    tileContainer.setOnShelf(true);

    $tileState[tile.getID()] = tileContainer;

    $dragArea.addChild(tileContainer.getTileContainer());
  }

  function removeTile(tile) {
    $tileState[tile.getID()].getTileContainer().destroy({ children:true });
    delete $tileState[tile.getID()];
    positionTiles();
  }

  // TODO: This function should really only be called during the tutorial game.
  //       My intent is to have the 'tile bag' appear on the screen in a way
  //       that's more dramatic than having it just appear on screen. When a
  //       normal game is started the tile bag should just already be visible.
  //
  function showTileBag() {
    $tileBag.renderable = true;
  }

  return Object.freeze({
    init,
    create,
    refresh,
    positionTiles,
    addTile,
    removeTile,
    showTileBag,
  })

})();
