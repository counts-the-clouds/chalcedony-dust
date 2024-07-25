global.Components = (function() {

  function initAll() {
    Console.init();

    waitForPixi().then(() => {
      DungeonView.init();
      EventView.init();
      MainMenu.init();
      OptionsOverlay.init();
    });
  }

  // Because PixiJS is coming from a <script> tag that's added after the page
  // has already loaded, it takes a little while to show up. So we to wait a
  // few milliseconds for to finish loading before we do the rest of the
  // initialization.
  function waitForPixi() {
    return new Promise(resolve => {
      let interval = setInterval(() => {
        if (global.PIXI) {
          clearInterval(interval);
          resolve();
        }
      },10);
    });
  }

  return {
    initAll
  }

})();
