global.GameState = (function() {

  const $stateRecorder = new StateRecorder(`${DATA}/gameState.json`);

  const DefaultState = {
    tileID: 100,
    flags: {},
  }

  let $testMode = false;
  let $testState = DefaultState;
  let $realState;

  function getValue(key) {
    return $testMode ? $testState[key] : $realState[key];
  }

  async function setValue(key,value) {
    ($testMode ? $testState : $realState)[key] = value;
    await saveState();
  }

  async function reset() {

    if ($testMode) {
      $testState = { ...DefaultState };
    }
    else {
      $realState = { ...DefaultState };
    }

    DungeonGrid.clear();
    TileBag.empty();
    TileShelf.clear();
    await saveState();
  }

  function nextTileID() {
    const id = getValue('tileID') + 1;
    setValue('tileID',id);
    return id;
  }

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

    try {
      const loadedState = await $stateRecorder.loadState();
      if (loadedState) {
        $realState = loadedState;
        DungeonGrid.unpack(loadedState.dungeonGrid);
        TileBag.unpack(loadedState.tileBag);
        TileShelf.unpack(loadedState.tileShelf);
      }
    }
    catch(error) {
      logError("Error Loading Game State",{ system:'GameState', data:JSON.stringify(error) });

      // TODO: If an exception is thrown reading the game state, for now we can
      //       assume we've just changed the save game format and should just
      //       delete the old game. In the future I might look into migrating
      //       old game formats or at least warning to user this is about to
      //       happen.
      fs.unlink(`${DATA}/gameState.json`, error => {});

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
