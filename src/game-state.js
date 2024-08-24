global.GameState = (function() {

  const $gameFile = `${DATA}/Game.json`;
  const $stateRecorder = new StateRecorder($gameFile);

  let $mana;

  // Clear removes the saved game files.
  async function clear() {
    await Models.clearAll();
    await fs.unlink($gameFile, error => {});
  }

  // Reset puts the game into it's default empty state but shouldn't
  // automatically save the game.
  function reset() {
    Models.reset();
    BuriedTreasure.reset();
    GameFlags.reset();
    GameInventory.reset();
    TileBag.reset();
    TileShelf.reset();
  }

  function setMana(mana) { $mana = mana; }
  function gainMana(mana) { $mana += mana; }
  function spendMana(mana) { $mana -= mana; }
  function getMana() { return $mana; }

  // === Saving and Loading ====================================================

  async function saveState() {
    if (Tests.running() === false) {
      await $stateRecorder.saveState({
        mana: $mana,
        buriedTreasure: BuriedTreasure.pack(),
        gameFlags: GameFlags.pack(),
        gameInventory: GameInventory.pack(),
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
        $mana = loadedState.mana;
        BuriedTreasure.unpack(loadedState.buriedTreasure);
        GameFlags.unpack(loadedState.gameFlags);
        GameInventory.unpack(loadedState.gameInventory);
        TileBag.unpack(loadedState.tileBag);
        TileShelf.unpack(loadedState.tileShelf);
        await Models.loadAll();
      }
    }
    catch(error) {
      logError("Error Loading Game State", error, { system:'GameState' });
    }

    log("Loaded Game State", { system:"GameState" });
  }

  return Object.freeze({
    clear,
    reset,
    setMana,
    gainMana,
    spendMana,
    getMana,
    saveState,
    loadState,
  });

})();
