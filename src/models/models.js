global.Models = (function() {

  let $dataStores;

  function init() {
    global.ChunkDataStore = DataStore({ name:'Chunk', model:Chunk });
    global.FeatureDataStore = DataStore({ name:'Feature', model:Feature });
    global.SegmentDataStore = DataStore({ name:'Segment', model:Segment });
    global.TileDataStore = DataStore({ name:'Tile', model:Tile });

    $dataStores = [
      ChunkDataStore,
      FeatureDataStore,
      SegmentDataStore,
      TileDataStore,
    ]
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
  function enableTestMode() { $dataStores.forEach(store => { store.enableTestMode(); }); }
  function disableTestMode() { $dataStores.forEach(store => { store.disableTestMode(); }); }

  return Object.freeze({
    init,
    saveAll,
    loadAll,
    reset,
    enableTestMode,
    disableTestMode,
  });

})();
