window.TileShelfView = (function() {

  // Normally I would make all of these consts, but Pixi will not be loaded
  // when this containing function is first run.
  let $dragArea;
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

    $leftTrim = new Pixi.Graphics();
    $leftTrim.rect(0,20,20,60);
    $leftTrim.stroke({ color:'rgb(80,100,80)' });
    $leftTrim.fill({ color:'rgb(40,50,40)' });

    $rightTrim = new Pixi.Graphics();
    $rightTrim.rect(200,20,20,60);
    $rightTrim.stroke({ color:'rgb(80,100,80)' });
    $rightTrim.fill({ color:'rgb(40,50,40)' });

    $center = new Pixi.Graphics();
    $center.rect(0,30,200,50);
    $center.stroke({ color:'rgb(80,100,80)' });
    $center.fill({ color:'rgb(40,50,40)' });

    $shelf = new Pixi.Container();
    $shelf.addChild($center);
    $shelf.addChild($leftTrim);
    $shelf.addChild($rightTrim);

    $dragArea = new Pixi.Container();
    $dragArea.x = 0;
    $dragArea.y = 0;
    $dragArea.width = application.screen.width
    $dragArea.height = application.screen.height

    application.stage.addChild($shelf);
    application.stage.addChild($dragArea);

    positionShelf();
  }

  function handleResize() {
    positionShelf();
    positionTiles();
  }

  // We should call this to rebuild the shelf if the tile shelf state changes.
  async function refresh() {
    await Promise.all(TileShelf.getShelf().map(async id => {
      await addTile(TileDataStore.get(id))
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
    }
  }

  async function addTile(tile) {
    const tileContainer = await TileContainer(tile);
    tileContainer.setSize(_tileSize/2);
    tileContainer.setOnShelf(true);

    $tileState[tile.getID()] = tileContainer;

    $dragArea.addChild(tileContainer.getTileContainer());
  }

  function removeTile(tileID) {
    $tileState[tileID].getTileContainer().destroy({ children:true });
    delete $tileState[tileID];
    positionTiles();
  }

  return Object.freeze({
    init,
    create,
    refresh,
    positionTiles,
    addTile,
    removeTile,
  })

})();
