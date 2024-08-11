global.MainMenu = (function() {

  function init() {
    X.onClick('#mainMenu a.start-button', confirmStartGame);
    X.onClick('#mainMenu a.continue-button', continueGame);
    X.onClick('#mainMenu a.options-button', OptionsOverlay.show);

  }

  function show() {
    MainContent.showCover();
    MainContent.setMainContent('views/main-menu.html');
    MainContent.setBackground('backgrounds/main-menu.jpg');

    adjustMenu();
    MainContent.hideCover({ fadeTime:1000 });
  }

  function adjustMenu() {
    if (WorldState.hasCurrentGame()) {
      X.removeClass('#mainMenu a.continue-button','hide');
    }
  }

  function confirmStartGame() {
    if (WorldState.hasCurrentGame() === false) {
      return startGame();
    }

    Confirmation.show({
      text: `Start a new game? This will overwrite your previous game.`,
      onConfirm: startGame,
    });
  }

  async function startGame() {
    await GameController.startNewGame();
    await DungeonView.open();
    await GameController.openGame();
  }

  async function continueGame() {
    await GameState.loadState();
    await DungeonView.open();
    await GameController.openGame();
  }

  return {
    init: init,
    show: show,
  };

})();
