global.Models = (function() {

  let $dataStores;

  // The loading of the data stores is slightly order dependent. I think it's
  // just the Segments that need to be loaded before the Tiles. That is, for
  // now at least.
  function init() {
    global.ClockDataStore = DataStore({ name:'Clock', model:Clock });
    global.ChunkDataStore = DataStore({ name:'Chunk', model:Chunk });
    global.FeatureDataStore = DataStore({ name:'Feature', model:Feature });
    global.HallDataStore = DataStore({ name:'Hall', model:Hall });
    global.ReactionDataStore = DataStore({ name:'Reaction', model:Reaction });
    global.ResourceDataStore = DataStore({ name:'Resource', model:Resource });
    global.RoomDataStore = DataStore({ name:'Room', model:Room });
    global.SegmentDataStore = DataStore({ name:'Segment', model:Segment });
    global.TileDataStore = DataStore({ name:'Tile', model:Tile });

    $dataStores = [
      ClockDataStore,
      ChunkDataStore,
      FeatureDataStore,
      HallDataStore,
      ReactionDataStore,
      ResourceDataStore,
      RoomDataStore,
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
    for (const store of $dataStores) {
      await store.load();
    }
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
