global.APP = `${ROOT}/application`;

global.Main = function() {
  try {
    MainContent.loadDependencies();
    MainContent.loadStyles();
    MainContent.loadMainContent();

    Elements.initAll();
    Components.initAll();
    Playground.init();

    WorldState.loadState();
    GameState.loadState();

    MainMenu.show();
    TestFramework.load();
    KeyboardMonitor.start();

    log("Chalcedony Started",{ system:'Main', data:{
      environment: Environment.name,
    }});
  }
  catch(error) {
    console.error(error);
  }
}

