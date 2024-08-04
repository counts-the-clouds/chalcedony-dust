global.GameState = (function() {

  const $gameFile = `${DATA}/Game.json`;
  const $stateRecorder = new StateRecorder($gameFile);

  // Clear removes the saved game files.
  async function clear() {
    await Models.clearAll();
    await fs.unlink($gameFile, error => {});
  }

  // Reset puts the game into it's default empty state but shouldn't
  // automatically save the game.
  function reset() {
    Models.reset();
    GameFlags.reset();
    TileBag.reset();
    TileShelf.reset();
  }

  // === Saving and Loading ====================================================

  async function saveState() {
    if (Tests.running() === false) {
      localLog("Saving Game State");

      await $stateRecorder.saveState({
        gameFlags: GameFlags.pack(),
        tileBag: TileBag.pack(),
        tileShelf: TileShelf.pack(),
      });

      await Models.saveAll();
    }
  }

  async function loadState() {
    if (Tests.running()) { return reset(); }

    try {
      const loadedState = await $stateRecorder.loadState();

      if (loadedState) {
        GameFlags.unpack(loadedState.gameFlags);
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

    localLog("Loaded Game State");
  }

  function localLog(message, data) {
    log(message, { system:"GameState", data:data });
  }

  return Object.freeze({
    clear,
    reset,
    saveState,
    loadState,
  });

})();
