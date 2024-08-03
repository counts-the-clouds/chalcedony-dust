global.GameState = (function() {

  const $gameFile = `${DATA}/Game.json`;
  const $stateRecorder = new StateRecorder($gameFile);

  let $testMode = false;

  // Clear removes the saved game file.
  async function clear() {
    await Models.clearAll();
    await fs.unlink($gameFile, error => {});
  }

  // Reset puts the game into it's default empty state but shouldn't
  // automatically save the game.
  function reset() {
    Models.reset();
    GameFlags.reset();
    DungeonGrid.reset();
    TileBag.reset();
    TileShelf.reset();
  }

  // === Saving and Loading ====================================================

  async function saveState() {
    if (!$testMode) {
      localLog("Saving Game State");

      await $stateRecorder.saveState({
        gameFlags: GameFlags.pack(),
        dungeonGrid: DungeonGrid.pack(),
        tileBag: TileBag.pack(),
        tileShelf: TileShelf.pack(),
      });

      await Models.saveAll();
    }
  }

  async function loadState() {
    if ($testMode) { return await reset(); }

    try {
      loadedState = await $stateRecorder.loadState();

      if (loadedState) {
        GameFlags.unpack(loadedState.gameFlags);
        DungeonGrid.unpack(loadedState.dungeonGrid);
        TileBag.unpack(loadedState.tileBag);
        TileShelf.unpack(loadedState.tileShelf);

        await Models.loadAll()
      }
    }
    catch(error) {
      logError("Error Loading Game State", error, { system:'GameState', data:{
        loadedState: loadedState,
      }});

      await clear();
      reset();
      await saveState();
    }

    localLog("Loaded Game State",$realState);
  }

  function enableTestMode() {
    Models.enableTestMode();
    $testMode = true;
  }

  function disableTestMode() {
    Models.disableTestMode();
    $testMode = false;
  }

  function localLog(message, data) {
    log(message, { system:"GameState", data:data });
  }

  return Object.freeze({
    clear,
    reset,

    saveState,
    loadState,

    enableTestMode,
    disableTestMode,
  });

})();
