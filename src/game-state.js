global.GameState = (function() {

  const $gameFile = `${DATA}/gameState.json`;
  const $stateRecorder = new StateRecorder($gameFile);

  const DefaultState = {
    tileID: 100,
    flags: {},
  }

  let $testMode = false;
  let $testState = DefaultState;
  let $realState;

  function getState() {
    return $testMode ? { ...$testState } : { ...$realState };
  }

  function getValue(key) {
    return $testMode ? $testState[key] : $realState[key];
  }

  async function setValue(key,value) {
    ($testMode ? $testState : $realState)[key] = value;
  }

  // Clear removes the saved game file.
  async function clear() {
    await fs.unlink($gameFile, error => {});
  }

  // Reset puts the game into it's default empty state but shouldn't
  // automatically save the game.
  function reset() {
    if ($testMode) {
      $testState = { ...DefaultState };
    }
    else {
      $realState = { ...DefaultState };
    }
    DungeonGrid.clear();
    TileBag.empty();
    TileShelf.clear();
  }

  function nextTileID() {
    const id = getValue('tileID') + 1;
    setValue('tileID',id);
    return id;
  }

  // === Flags =================================================================
  // Flags are a dead simple key/value store. Because it's serialized to JSON
  // it can't store any classes.
  function setFlag(flag, value) {
    const state = $testMode ? $testState : $realState
    state.flags[flag] = value;
  }

  function clearFlag(flag) {
    const state = $testMode ? $testState : $realState
    delete state.flags[flag];
  }

  function getFlag(flag) { return getValue('flags')[flag]; }
  function getFlags() { return { ...getValue('flags') }; }

  // === Saving and Loading ====================================================

  async function saveState() {
    if (!$testMode) {
      localLog("Saving Game State",$realState);
      await $stateRecorder.saveState({
        gameState: $realState,
        dungeonGrid: DungeonGrid.pack(),
        tileBag: TileBag.pack(),
        tileShelf: TileShelf.pack(),
      });
    }
  }

  async function loadState() {
    if ($testMode) { return await reset(); }

    let loadedState;

    try {
      loadedState = await $stateRecorder.loadState();
      if (loadedState) {

        $realState = loadedState;
        DungeonGrid.unpack(loadedState.dungeonGrid);
        TileBag.unpack(loadedState.tileBag);
        TileShelf.unpack(loadedState.tileShelf);
      }
    }
    catch(error) {
      logError("Error Loading Game State", error, { system:'GameState', data:{
        loadedState: loadedState,
      }});

      // TODO: If an exception is thrown reading the game state, for now we can
      //       assume we've just changed the save game format and should just
      //       delete the old game. In the future I might look into migrating
      //       old game formats or at least warning to user this is about to
      //       happen.
      fs.unlink($gameFile, error => {});

      $realState = null;
      DungeonGrid.clear();
      TileBag.empty();
      TileShelf.clear();
    }

    localLog("Loaded Game State",$realState);
  }

  function enableTestMode() { $testMode = true; }
  function disableTestMode() { $testMode = false; }

  function localLog(message, data) {
    log(message, { system:"GameState", data:data });
  }

  return Object.freeze({
    getState,
    getValue,
    setValue,

    clear,
    reset,

    nextTileID,

    setFlag,
    clearFlag,
    getFlag,
    getFlags,

    saveState,
    loadState,

    enableTestMode,
    disableTestMode,
  });

})();
