global.Components = (function() {

  function initAll() {
    AssetLibrary.init();
    Console.init();
    DungeonView.init();
    EventView.init();
    MainMenu.init();
    OptionsOverlay.init();
    SpeedControl.init();
    WindowManager.init();
  }

  return {
    initAll
  }

})();
