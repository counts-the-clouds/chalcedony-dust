global.Components = (function() {

  function initAll() {
    AssetLibrary.init();
    Console.init();
    DungeonView.init();
    EventView.init();
    MainMenu.init();
    MouseMonitor.init();
    OptionsOverlay.init();
    SpeedControl.init();
    WindowManager.init();
    WorkerControl.init();
  }

  return {
    initAll
  }

})();
