global.MainMenu = (function() {

  function init() {
    X.onClick('#mainMenu a.start-button', startGame);
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
    // We need to show a continue button if there's currently an active game.
    // Clicking the new game should make give us a warning about overwriting a
    // current game or some such.
  }

  function startGame() {
    console.log("TODO: StartGame");
  }

  return {
    init: init,
    show: show,
  };

})();
