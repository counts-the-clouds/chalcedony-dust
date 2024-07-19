
global.TestFramework = (function() {

  // Not a great way to do this. Mocha probably has some events I could hook
  // into instead, but just setting a few timeouts that anticipate how long
  // it's going take for mocha to load and then run all the tests is quick and
  // dirty and probably work 99% of the time. Good enough for non-production
  // code.
  const $mochaLoadTime = 500;
  const $mochaTestTime = 100;

  function load() {
    if (Environment.isDevelopment) {
      addTestFrame();
      loadMocha();
      runTests();

      X.onClick('#mocha li.test',item => {
        ScrollingPanel.resize('#testFrame');
      });
    }
  }

  function addTestFrame() {
    const testFrame = X.createElement(`
      <div id='testFrame' class='scrolling-panel'>
        <div class='header'></div>
        <div class='scrolling-panel-content'>
          <div id="mocha"></div>
        </div>
      </div>`);

    X.first('#mainContent').appendChild(testFrame);

    ScrollingPanel.build('#testFrame');
  }

  function loadMocha() {
    MainContent.addStylesheet(`${APP}/lib/mocha.css`);
    require(`${APP}/lib/mocha.js`);

    global.expect = require(`${APP}/lib/chai.js`).expect;

    mocha.setup({
      ui:'bdd',
      rootHooks: {
        beforeAll: rootBefore,
        afterAll: rootAfter,
      }
    });
    mocha.checkLeaks();

    require(`${APP}/manifest.json`).testFileList.forEach(path => {
      require(`${APP}/${path}`);
    });
  }

  async function rootBefore() {
    WorldState.enableTestMode();
    GameState.enableTestMode();
    await WorldState.reset();
    await GameState.reset();
  }

  function rootAfter() {
    WorldState.disableTestMode();
    GameState.disableTestMode();
  }

  function runTests() {
    setTimeout(mocha.run,$mochaLoadTime);
    setTimeout(resizeReport,$mochaLoadTime + $mochaTestTime);
  }

  function resizeReport() {
    if (X('#mocha .test.fail').length > 0) {
      X.addClass('#testFrame','with-failures');
      X.addClass('#mainMenu','hide');
    }

    ScrollingPanel.resize('#testFrame');
  }

  return {
    load
  };


})();

