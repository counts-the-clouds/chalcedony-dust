global.APP = `${ROOT}/application`;

global.Main = async function() {
  try {
    MainContent.loadDependencies();
    MainContent.loadStyles();
    MainContent.loadMainContent();

    Elements.initAll();
    Components.initAll();
    Playground.init();

    await WorldState.loadState();
    await GameState.loadState();

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

