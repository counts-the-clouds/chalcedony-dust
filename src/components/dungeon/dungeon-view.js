global.DungeonView = (function() {

  function open() {
    MainContent.setMainContent('views/dungeon-view.html');
  }

  return Object.freeze({
    open,
  });

})();