global.DataStore = function(options) {

  const $name = options.name;
  const $model = options.model;
  const $dataFile = `${DATA}/${$name}.json`;
  const $stateRecorder = new StateRecorder($dataFile);

  let $autoIncrement;

  let $testStore;
  let $realStore;

  async function clear() {
    await fs.unlink($dataFile, error => {});
  }

  function reset() {
    $autoIncrement = 1;
    if (Tests.running()) { $testStore = {}; }
    if (!Tests.running()) { $realStore = {} }
  }

  function nextID() { return $autoIncrement++; }

  function activeStore() {
    const store = Tests.running() ? $testStore : $realStore
    if (store == null) { throw `${$name} DataStore has not been initialized.` }
    return store;
  }

  function getName() { return $name; }
  function all() { return Object.values(activeStore()); }
  function exists(id) { return activeStore()[id] != null; }
  function get(id) { return activeStore()[id]; }
  function store(model) { activeStore()[model.getID()] = model; }
  function remove(id) { delete activeStore()[id]; }

  async function save() {
    if (Tests.running() === false) {
      await $stateRecorder.saveState({
        autoIncrement: $autoIncrement,
        store: Object.values($realStore).map(model => {
          return model.pack();
        }),
      });
    }
  }

  async function load() {
    if (Tests.running()) { return reset(); }

    try {
      const state = await $stateRecorder.loadState();
      $autoIncrement = state.autoIncrement;
      $realStore = {}

      state.store.forEach(data => {
        store($model(data));
      })
    }
    catch(error) {
      logError(`Loading Error`, error, { system:`DataStore:${name}`});
    }
  }

  return Object.freeze({
    clear,
    reset,
    nextID,
    getName,
    all,
    exists,
    get,
    store,
    remove,
    save,
    load,
  });
}
