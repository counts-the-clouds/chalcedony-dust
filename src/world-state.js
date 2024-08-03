global.WorldState = (function() {

  const DefaultBindings = [
    { name:'Move Down',          action:'action.move-down',          codes:[ _keyCodeS, _keyCodeArrowDown ]},
    { name:'Move Up',            action:'action.move-up',            codes:[ _keyCodeW, _keyCodeArrowUp ]},
    { name:'Move Left',          action:'action.move-left',          codes:[ _keyCodeA, _keyCodeArrowLeft ]},
    { name:'Move Right',         action:'action.move-right',         codes:[ _keyCodeD, _keyCodeArrowRight ]},
    { name:'Rotate Clockwise',   action:'action.rotate-clockwise',   codes:[ _keyCodeE ]},
    { name:'Rotate Widdershins', action:'action.rotate-widdershins', codes:[ _keyCodeQ ]},
    { name:'Pause',              action:'action.pause',              codes:[ _keyCodeSpace ]},
    { name:'Set Speed ▶',        action:'action.set-speed-1',        codes:[ _keyDigit1, _keyNumpad1 ]},
    { name:'Set Speed ▶▶',       action:'action.set-speed-2',        codes:[ _keyDigit2, _keyNumpad2 ]},
    { name:'Set Speed ▶▶▶',      action:'action.set-speed-3',        codes:[ _keyDigit3, _keyNumpad3 ]},
  ];

  const DefaultState = {
    chapter: _tutorial,
    options: {
      keyBindings: DefaultBindings,
    },
  }

  const $stateRecorder = new StateRecorder(`${DATA}/World.json`);

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

  // Resetting the world state removes all of the game progression. This is
  // called when the specs are started in order to baseline the world state,
  // but would very rarely if ever be called in production. Maybe if the game
  // version changes, but even then we'd probably want to migrate the state
  // rather than resetting, so perhaps only if a migration fails, or an error
  // is thrown by loadState().
  async function reset() {
    if ($testMode) {
      $testState = { ...DefaultState };
    }
    else {
      log("Resetting World State",{ system:'WorldState', level:1, type:_warning });
      $realState = { ...DefaultState };
    }

    await saveState();
  }

  function getKeyBindings() { return getValue('options').keyBindings; }
  function getOptions() { return getValue('options'); }
  function getChapter() { return getValue('chapter'); }

  async function setOptions(options) { await setValue('options',options); }

  async function saveState() {
    if (!$testMode) {
      localLog("Saving World State",$realState);
      await $stateRecorder.saveState($realState);
    }
  }

  async function loadState() {
    if ($testMode) { return await reset(); }

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

  function enableTestMode() { $testMode = true; }
  function disableTestMode() { $testMode = false; }

  function localLog(message, data) {
    log(message, { system:"WorldState", data:data });
  }

  return Object.freeze({
    DefaultBindings,
    reset,
    getKeyBindings,
    getOptions,
    getChapter,
    setOptions,
    saveState,
    loadState,
    enableTestMode,
    disableTestMode,
  });

})();
