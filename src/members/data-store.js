global.DataStore = function(options) {

  const $name = options.name;
  const $dataFile = `${DATA}/${$name}.json`;
  const $stateRecorder = new StateRecorder($dataFile);

  let $autoIncrement;

  let $testMode = false;
  let $testStore;
  let $realStore;

  async function clear() {
    await fs.unlink($dataFile, error => {});
  }

  function reset() {
    $autoIncrement = 10000;
    if ($testMode) { $testStore = {}; }
    if (!$testMode) { $realStore = {}; }
  }

  function nextID() { return $autoIncrement++; }

  function activeStore() { return $testMode ? $testStore : $realStore }
  function all() { return Object.values(activeStore()); }
  function exists(id) { return activeStore()[id] != null; }
  function get(id) { return activeStore()[id]; }
  function store(model) { activeStore()[model.getID()] = model; }

  async function save() {
    if (!$testMode) {
      await $stateRecorder.saveState({
        autoIncrement: $autoIncrement,
        store: $realStore,
      });
    }
  }

  async function load() {
    if ($testMode) { return reset(); }

    try {
      const state = await $stateRecorder.loadState();
      $autoIncrement = state.autoIncrement;
      $realStore = state.store;
    }
    catch(error) {
      logError(`Loading Error`, error, { system:`DataStore:${name}`});

      reset();

      await clear();
      await save();
    }
  }

  function enableTestMode() { $testMode = true; }
  function disableTestMode() { $testMode = false; }

  return Object.freeze({
    clear,
    reset,
    nextID,
    all,
    exists,
    get,
    store,
    save,
    load,
    enableTestMode,
    disableTestMode,
  });
}
