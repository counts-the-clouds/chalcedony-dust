
global.Casement = function(options) {

  const $id = options.id;
  const $casementContent = options.casementContent;
  const $casementWindow = options.casementWindow;

  function getID() { return $id }
  function getCasementContent() { return $casementContent; }
  function getCasementWindow() { return $casementWindow; }

  return Object.freeze({
    getID,
    getCasementContent,
    getCasementWindow,
  });
}

Casement.init = function() {
  Casement.Internals = {
    currentCasements: {},
    counter: 100,
  }
}

Casement.fromPath = function(path) {
  return new Promise(resolve => {
    const index = Casement.Internals.counter++;
    const id = `casement-${index}`;

    const casementContent = X.createElement(
      `<div class='casement-content'>${FileHelper.readFile(path)}</div>
    `);

    const casementWindow = X.createElement(`
      <div id='${id}' class='casement-window' style='z-index:${4000+index}'>
        <div class='casement-bar'>
          <h1 class='title'>[TITLE]</h1>
          <a href='#' class='close-button'></a>
        </div>
        <div class='scrolling-panel'>
          <div class='scrolling-panel-content'>
          </div>
        </div>
      </div>
    `);

    casementWindow.querySelector('.scrolling-panel-content').appendChild(casementContent);
    X.first('#casementsArea').appendChild(casementWindow);

    const casement = Casement({ id, casementContent, casementWindow });
    Casement.Internals.currentCasements[id] = casement;

    resolve(casement);
  });
}
