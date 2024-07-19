global.GameState = (function() {

  const $stateRecorder = new StateRecorder(`${DATA}/gameState.json`);

  let $currentState;

  function clear() {
    $currentState = {
      tileID: 100,
      flags: {},
    };

    // DungeonGrid.clear();
    // TileBag.empty();
    // TileShelf.clear();
  }

  function nextTileID() {
    $currentState.tileID += 1;
    return $currentState.tileID;
  }

  // Flags are a dead simple key/value store. Because it's serialized to JSON
  // it can't store any classes.
  function setFlag(flag, value) { $currentState.flags[flag] = value; }
  function clearFlag(flag) { delete $currentState.flags[flag]; }
  function getFlag(flag) { return $currentState.flags[flag]; }
  function getFlags() { return { ...$currentState.flags }; }

  function saveState() {
    return $stateRecorder.saveState({
      gameState: $currentState,
      // dungeonGrid: DungeonGrid.pack(),
      // tileBag: TileBag.pack(),
      // tileShelf: TileShelf.pack(),
    });
  }

  function loadState() {
    $stateRecorder.loadState().then(state => {
      try {
        if (state == null) { return clear(); }

        $currentState = state.gameState;
        // DungeonGrid.unpack(state.dungeonGrid);
        // TileBag.unpack(state.tileBag);
        // TileShelf.unpack(state.tileShelf);
      }
      catch(error) {
        // TODO: Log to console...
        console.error("=== Error loading game state ===");
        console.error("Most likely the saved game state is out of date.");
        console.error("If this is development mode, just clear out the DATA directory.");
        console.error(error);
      }
    });
  }

  return Object.freeze({
    clear,
    nextTileID,
    setFlag,
    clearFlag,
    getFlag,
    getFlags,
    saveState,
    loadState,
  });

})();
