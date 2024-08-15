global.WorldState = (function() {

  const DefaultBindings = [
    { name:'Move Down',          action:'action.move-down',          codes:[ KeyCodes.S, KeyCodes.ArrowDown ]},
    { name:'Move Up',            action:'action.move-up',            codes:[ KeyCodes.W, KeyCodes.ArrowUp ]},
    { name:'Move Left',          action:'action.move-left',          codes:[ KeyCodes.A, KeyCodes.ArrowLeft ]},
    { name:'Move Right',         action:'action.move-right',         codes:[ KeyCodes.D, KeyCodes.ArrowRight ]},
    { name:'Rotate Clockwise',   action:'action.rotate-clockwise',   codes:[ KeyCodes.E ]},
    { name:'Rotate Widdershins', action:'action.rotate-widdershins', codes:[ KeyCodes.Q ]},
    { name:'Pause',              action:'action.pause',              codes:[ KeyCodes.Space ]},
    { name:'Set Speed ▶',        action:'action.set-speed-1',        codes:[ KeyCodes.Digit1, KeyCodes.Numpad1 ]},
    { name:'Set Speed ▶▶',       action:'action.set-speed-2',        codes:[ KeyCodes.Digit2, KeyCodes.Numpad2 ]},
    { name:'Set Speed ▶▶▶',      action:'action.set-speed-3',        codes:[ KeyCodes.Digit3, KeyCodes.Numpad3 ]},
  ];

  const DefaultState = {
    gameCount: 0,
    chapter: _tutorialStage,
    options: {
      keyBindings: DefaultBindings,
    },
  }

  const $stateRecorder = new StateRecorder(`${DATA}/World.json`);

  let $testState = DefaultState;
  let $realState;

  function activeState() { return Tests.running() ? $testState : $realState; }
  function hasValue(key) { return activeState()[key] != null; }
  function getValue(key) { return activeState()[key]; }

  async function setValue(key,value) {
    activeState()[key] = value;
    await saveState();
  }

  // Resetting the world state removes all the game progression. This is called
  // when the specs are started in order to baseline the world state, but would
  // very rarely if ever be called in production. Maybe if the game version
  // changes, but even then we'd probably want to migrate the state rather than
  // resetting, so perhaps only if a migration fails, or an error is thrown by
  // loadState().
  async function reset() {
    if (Tests.running()) {
      $testState = { ...DefaultState };
    }
    else {
      log("Resetting World State",{ system:'WorldState', level:1, type:LogType.warning });
      $realState = { ...DefaultState };
    }

    await saveState();
  }

  async function startNewGame() {
    const count = getValue('gameCount') + 1;
    const state = activeState();

    state.gameCount = count;
    state.currentGame = { gameNumber:count };

    await saveState();
  }

  function getCurrentGame() { return getValue('currentGame'); }
  function hasCurrentGame() { return hasValue('currentGame'); }

  async function setOptions(options) { await setValue('options',options); }
  function getOptions() { return getValue('options'); }
  function getKeyBindings() { return getValue('options').keyBindings; }

  async function setChapter(chapter) { await setValue('chapter', chapter); }
  function getChapter() { return getValue('chapter'); }

  async function saveState() {
    if (Tests.running() === false) {
      localLog("Saving World State",$realState);
      await $stateRecorder.saveState($realState);
    }
  }

  async function loadState() {
    if (Tests.running()) { return await reset(); }

    try {
      const loadedState = await $stateRecorder.loadState();
      if (loadedState) {
        $realState = loadedState;
      }
    } catch(error) {
      logError("Error Loading World State", error, { system:"WorldState" });
    }

    if ($realState == null) {
      await reset();
    }

    localLog("Loaded World State",{
      chapter: $realState.chapter,
    });
  }

  function localLog(message, data) {
    log(message, { system:"WorldState", data:data });
  }

  return Object.freeze({
    DefaultBindings,
    reset,
    startNewGame,
    getCurrentGame,
    hasCurrentGame,
    setOptions,
    getOptions,
    getKeyBindings,
    setChapter,
    getChapter,
    saveState,
    loadState,
  });

})();
