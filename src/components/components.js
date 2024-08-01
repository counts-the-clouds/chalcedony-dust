global.Components = (function() {

  function initAll() {
    Console.init();
    DungeonView.init();
    EventView.init();
    MainMenu.init();
    OptionsOverlay.init();
    SpeedControl.init();
  }

  return {
    initAll
  }

})();
