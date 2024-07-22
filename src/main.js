global.APP = `${ROOT}/application`;

global.Main = async function() {
  try {
    await MainContent.loadDependencies();
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
    logError("Error booting main", error, { system:'Main' });
  }
}
