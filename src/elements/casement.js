
global.Casement = function(options) {

  const barHeight = 20;

  const $id = options.id;
  const $casementContent = options.casementContent;
  const $casementWindow = options.casementWindow;
  const $scrollingPanel = options.scrollingPanel;

  function getID() { return $id }
  function getCasementContent() { return $casementContent; }
  function getCasementWindow() { return $casementWindow; }

  function setTitle(title) {
    $casementWindow.querySelector('h1.title').innerHTML = title;
  }

  function setBounds(bounds) {
    if (bounds.height < 100) { bounds.height = 100; }
    if (bounds.width < 300) { bounds.width = 300; }

    $casementWindow.style['top'] = `${bounds.top}px`;
    $casementWindow.style['left'] = `${bounds.left}px`;
    $casementWindow.style['height'] = `${bounds.height}px`;
    $casementWindow.style['width'] = `${bounds.width}px`;

    $scrollingPanel.style['height'] = `${bounds.height - barHeight}px`;

    ScrollingPanel.resize($scrollingPanel);
  }

  return Object.freeze({
    getID,
    getCasementContent,
    getCasementWindow,
    setTitle,
    setBounds,
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
        <div class='resize-handle ne'></div>
        <div class='resize-handle nw'></div>
        <div class='resize-handle se'></div>
        <div class='resize-handle sw'></div>
        <div class='casement-container'>
          <div class='scrolling-panel'>
            <div class='scrolling-panel-content'></div>
          </div>
        </div>
      </div>
    `);

    casementWindow.querySelector('.close-button').style['background-image'] = X.assetURL('ui/x-icon.png');
    casementWindow.querySelector('.scrolling-panel-content').appendChild(casementContent);
    X.first('#casementsArea').appendChild(casementWindow);

    const scrollingPanel = casementWindow.querySelector('.scrolling-panel')
    ScrollingPanel.build(scrollingPanel);

    const casement = Casement({ id, casementContent, casementWindow, scrollingPanel });
    Casement.Internals.currentCasements[id] = casement;

    resolve(casement);
  });
}
