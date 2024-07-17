global.Playground = (function() {

  // I wanted a quick way to run arbritrary views or just execute some code
  // that isn't really related to the game. Mostly for quick experiments with
  // Pixi or other frameworks. The advantage to doing it inside of the
  // application itself, rather than as a quick one off project is that I'll
  // have all of the normal models and data and such to use in whatever I'm
  // trying out. Something like this could eventually be turned into some kind
  // of modding API.
  //
  //   <a href='#' class='open-playground' data-code='stuff'>
  //
  //   PlaygroundRegistry.register('stuff',{
  //     init: function() { console.log("Init Function") },
  //     run: function() { console.log("Run Function") },
  //     show: 'stuff.html',
  //   });
  //
  function init() {
    PlaygroundRegistry.forEach((code,playground) => {
      if (playground.init && typeof playground.init === 'function') {
        playground.init();
      }
    });

    X.onClick('a.open-playground', event => {
      run(event.target.dataset.code);
    });
  }

  // Run (and show) the playground with the given code.
  function run(code) {
    try {
      const playground = PlaygroundRegistry.lookup(code);

      if (playground.show && typeof playground.show === 'string') {
        MainContent.setMainContent(playground.show);
      }

      if (playground.run && typeof playground.run === 'function') {
        playground.run()
      }
    }
    catch(error) {
      logError(JSON.stringify(error), { system:'Playground' });
    }

  }

  return {
    init,
    run,
  };

})();
