global.Models = (function() {

  let $dataStores;

  function init() {
    global.ClockDataStore = DataStore({ name:'Clock', model:Clock });
    global.ChunkDataStore = DataStore({ name:'Chunk', model:Chunk });
    global.FeatureDataStore = DataStore({ name:'Feature', model:Feature });
    global.SegmentDataStore = DataStore({ name:'Segment', model:Segment });
    global.TileDataStore = DataStore({ name:'Tile', model:Tile });

    $dataStores = [
      ClockDataStore,
      ChunkDataStore,
      FeatureDataStore,
      SegmentDataStore,
      TileDataStore,
    ]
  }

  async function clearAll() {
    await Promise.all($dataStores.map(async store => {
      await store.clear();
    }));
  }

  async function saveAll() {
    await Promise.all($dataStores.map(async store => {
      await store.save();
    }));
  }

  async function loadAll() {
    await Promise.all($dataStores.map(async store => {
      await store.load();
    }));
  }

  function reset() { $dataStores.forEach(store => { store.reset(); }); }

  return Object.freeze({
    init,
    clearAll,
    saveAll,
    loadAll,
    reset,
  });

})();
