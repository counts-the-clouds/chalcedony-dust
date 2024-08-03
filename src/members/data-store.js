global.DataStore = function(options) {

  const $name = options.name;
  const $dataFile = `${DATA}/${$name}.json`;
  const $stateRecorder = new StateRecorder($dataFile);

  let $autoIncrement = 10000;

  let $testMode = false;
  let $testStore = {};
  let $realStore = {};

  async function clear() {
    await fs.unlink($dataFile, error => {});
  }

  function reset() {
    if ($testMode) { $testStore = {}; }
    if (!$testMode) { $realStore = {}; }
  }

  function get(id) {
    return $testMode ? $testStore[id] : $realStore[id];
  }

  async function set(id,value) {
    ($testMode ? $testStore : $realStore)[key] = value;
  }

  async function save() {
    if (!$testMode) {
      await $stateRecorder.saveState($realStore);
    }
  }

  async function load() {
    if ($testMode) { return reset(); }

    try {
      $realStore = await $stateRecorder.loadState();
    }
    catch(error) {
      logError(`Loading Error`, error, { system:`DataStore:${name}`});
    }
  }

  function enableTestMode() { $testMode = true; }
  function disableTestMode() { $testMode = false; }

  return Object.freeze({
    clear,
    reset,
    get,
    set,
    save,
    load,
    enableTestMode,
    disableTestMode,
  });
}
