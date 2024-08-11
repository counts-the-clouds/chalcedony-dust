global.MainMenu = (function() {

  function init() {
    X.onClick('#mainMenu a.start-button', confirmStartGame);
    X.onClick('#mainMenu a.continue-button', continueGame);
    X.onClick('#mainMenu a.options-button', OptionsOverlay.show);
    X.onClick('#mainMenu a.quit-button', window.close);
  }

  function fullOpen() {
    show();
    MainContent.showCover();
    MainContent.setBackground('backgrounds/main-menu.jpg');
    adjustMenu();
    MainContent.hideCover({ fadeTime:1000 });
  }

  function show() { X.removeClass('#mainMenu','hide'); }
  function hide() { X.addClass('#mainMenu','hide'); }
  function isVisible() { return X.hasClass('#mainMenu','hide'); }

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
    hide();
    await GameController.startNewGame();
    await DungeonView.open();
    await GameController.openGame();
  }

  async function continueGame() {
    hide();
    await GameState.loadState();
    await DungeonView.open();
    await GameController.openGame();
  }

  return {
    init,
    fullOpen,
    show,
    hide,
    isVisible
  };

})();
