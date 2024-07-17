global.MainMenu = (function() {

  function init() {
    X.onClick('#mainMenu a.start-button', startGame);
    X.onClick('#mainMenu a.options-button', OptionsOverlay.show);
  }

  function show() {
    MainContent.showCover();
    MainContent.setMainContent('views/main-menu.html');
    MainContent.setBackground('backgrounds/main-menu.jpg');

    adjustStartButton();
    MainContent.hideCover({ fadeTime:1000 });
  }

  function setContext(context) {
    // log("Set Context",{ system:'MainMenu', data:context })
    // We used this to check if we should show continue or not.
  }

  function adjustStartButton() {
    // Change start to continue if there's an active game.
  }

  function startGame() {
    // MainContent.reset();
    // ClientCommands.send('game.new');
    // When there is a current came we continue.
    // ClientCommands.send('game.continue');
  }

  return {
    init: init,
    show: show,
    setContext: setContext,
  };

})();
