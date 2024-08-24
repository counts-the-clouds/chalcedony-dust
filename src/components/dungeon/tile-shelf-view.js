window.TileShelfView = (function() {

  let $shelfBackground;
  let $shelfSize;
  let $dragArea;
  let $shelf;
  let $tileProgress;

  let $tileState;

  function init() {
    $tileState = {};
  }

  // TODO: We'll just draw the tile shelf with a graphics object for now.
  //       Eventually we'll want this to be a sprite with "Good Graphics".
  //       Might even render something out in Blender. Still thinking about
  //       the overall look of things.
  //
  async function create(application) {
    $shelfBackground = new Pixi.Graphics();

    $shelfSize = new Pixi.Graphics();
    $shelfSize.rect(0,0,getWidth(),30);
    $shelfSize.fill({ color:'rgba(250,150,0,0)' });

    $tileProgress = new Pixi.Graphics();

    $shelf = new Pixi.Container();
    $shelf.addChild($shelfSize);
    $shelf.addChild($tileProgress);

    $dragArea = new Pixi.Container();
    $dragArea.x = 0;
    $dragArea.y = 0;
    $dragArea.width = application.screen.width
    $dragArea.height = application.screen.height

    application.stage.addChild($shelfBackground);
    application.stage.addChild($shelf);
    application.stage.addChild($dragArea);

    updateProgressBar(0);
  }

  // We should call this to rebuild the shelf if the tile shelf state changes.
  async function refresh() {
    await Promise.all(TileShelf.getShelf().map(async id => {
      await addTile(TileDataStore.get(id))
    }));
  }

  // At least 200, but assume tile size of 64px + 10px margin
  function getWidth() {
    const size = GameFlags.get(SystemFlags.tileShelfSize);
    return (size <= 2) ? 200 : (size * 74) + 10;
  }

  function handleResize() {
    positionShelf();
    positionTiles();
  }

  function positionShelf() {
    if ($shelf) {
      const screen = DungeonView.getDimensions();
      $shelf.y = screen.height - $shelf.height;
      $shelf.x = (screen.width/2) - ($shelf.width/2);

      $shelfBackground.rect(0,0,screen.width,40);
      $shelfBackground.stroke({ color:'rgb(70,70,90)' });
      $shelfBackground.fill({ color:'rgb(15,15,24)' });
      $shelfBackground.y = screen.height - 30;
    }
  }

  function positionTiles() {
    Object.values($tileState).forEach(tileContainer => {
      tileContainer.setPosition(
        ($shelf.x + ($shelf.width/2)),
        ($shelf.y - 30));
    });
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


  function updateProgressBar(percentage) {
    const barWidth = getWidth() - 20
    const progressWidth = barWidth * (percentage / 100);

    let progressColor = 'rgba(120,170,120,0.6)';

    if (TileShelf.isFull()) {
      if (percentage > 50) { progressColor = 'rgba(200,150,100,0.6)' }
      if (percentage > 75) { progressColor = 'rgba(250,100,100,0.6)' }
    }

    $tileProgress.rect(10,10,barWidth,10);
    $tileProgress.fill({ color:'rgb(0,0,0)' });

    $tileProgress.rect(10,12,progressWidth,6);
    $tileProgress.fill({ color:progressColor });
  }

  return Object.freeze({
    init,
    create,
    handleResize,
    refresh,
    getWidth,
    positionTiles,
    addTile,
    removeTile,
    updateProgressBar,
  })

})();
