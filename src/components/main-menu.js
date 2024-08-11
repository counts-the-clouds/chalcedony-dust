global.MainMenu = (function() {

  function init() {
    X.onClick('#mainMenu a.start-button', confirmStartGame);
    X.onClick('#mainMenu a.continue-button', continueGame);
    X.onClick('#mainMenu a.options-button', showOptions);
    X.onClick('#mainMenu a.quit-button', window.close);
  }

  function openFully() {
    open();
    MainContent.showCover();
    MainContent.setBackground('backgrounds/main-menu.jpg');
    MainContent.hideCover({ fadeTime:1000 });
  }

  function show() { X.removeClass('#mainMenu','hide'); }
  function hide() { X.addClass('#mainMenu','hide'); }

  function open() {
    adjustMenu();
    show();

    if (DungeonView.isVisible() && ClockManager.canChangeSpeed()) {
      ClockManager.setClockSpeed(0)
    }
  }

  function close() {
    hide();

    if (DungeonView.isVisible() && ClockManager.canChangeSpeed()) {
      ClockManager.togglePause()
    }
  }

  function isVisible() { return X.hasClass('#mainMenu','hide') === false; }

  function adjustMenu() {
    if (WorldState.hasCurrentGame()) {
      X.removeClass('#mainMenu a.continue-button','hide');
    }
    if (DungeonView.isVisible()) {
      X.addClass('#mainMenu a.start-button','hide');
      X.addClass('#mainMenu a.continue-button','hide');
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
    close();
    await GameController.startNewGame();
    await DungeonView.open();
    await GameController.openGame();
  }

  async function continueGame() {
    close();
    await GameState.loadState();
    await DungeonView.open();
    await GameController.openGame();
  }

  function showOptions() {
    OptionsOverlay.open();
    WindowManager.push(OptionsOverlay)
  }

  function toString() { return `MainMenu` }

  return {
    init,
    openFully,
    show,
    hide,
    open,
    close,
    isVisible,
    toString,
  };

})();
