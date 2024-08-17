global.Casement = (function() {
  const _barHeight = 20;
  const _borderWidth = 3;

  const $$currentCasements = {};
  let $$casementCounter = 100;
  let $$dragContext;

  function init() {
    X.onClick('.casement-window .close-button',event => {
      findCasement(event).close();
    });
  }

  function findCasement(event) {
    return $$currentCasements[event.target.closest('.casement-window').getAttribute('id')]
  }

  function fromPath(path) {
    return new Promise(resolve => {
      const index = $$casementCounter++;
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

      const casement = buildCasement({ id, casementContent, casementWindow, scrollingPanel });
      $$currentCasements[id] = casement;
      WindowManager.push(casement);

      resolve(casement);
    });
  }

  function buildCasement(options) {
    const $id = options.id;
    const $casementContent = options.casementContent;
    const $casementWindow = options.casementWindow;
    const $scrollingPanel = options.scrollingPanel;

    let $bounds = {};

    function getID() { return $id }
    function getCasementContent() { return $casementContent; }
    function getCasementWindow() { return $casementWindow; }

    $casementWindow.querySelector('.resize-handle').addEventListener('mousedown', event => startResizeDrag(event));
    $casementWindow.querySelector('.casement-bar').addEventListener('mousedown', event => startMoveDrag(event));

    function setTitle(title) {
      $casementWindow.querySelector('h1.title').innerHTML = title;
    }

    function setBounds(bounds) {
      $bounds = bounds;
      reposition();
    }

    function moveTo(point) {
      $bounds.left = point.x;
      $bounds.top = point.y;
      reposition();
    }

    function reposition() {
      if ($bounds.height < 100) { $bounds.height = 100; }
      if ($bounds.width < 300) { $bounds.width = 300; }

      if ($bounds.top < 0) { $bounds.top = 0; }
      if ($bounds.left < 0) { $bounds.left = 0; }
      if ($bounds.left + $bounds.width + (_borderWidth*2) > window.innerWidth) {
        $bounds.left = window.innerWidth - $bounds.width - (_borderWidth*2); }
      if ($bounds.top + $bounds.height + (_borderWidth*2) > window.innerHeight) {
        $bounds.top = window.innerHeight - $bounds.hight - (_borderWidth*2); }

      $casementWindow.style['top'] = `${$bounds.top}px`;
      $casementWindow.style['left'] = `${$bounds.left}px`;
      $casementWindow.style['height'] = `${$bounds.height}px`;
      $casementWindow.style['width'] = `${$bounds.width}px`;

      $scrollingPanel.style['height'] = `${$bounds.height - _barHeight}px`;

      ScrollingPanel.resize($scrollingPanel);
    }

    function close() {
      $casementWindow.remove();
      delete $$currentCasements[$id];
      if (Object.keys($$currentCasements).length === 0) {
        $$casementCounter = 100;
      }
    }

    return Object.freeze({
      getID,
      getCasementContent,
      getCasementWindow,
      setTitle,
      setBounds,
      moveTo,
      close,
    });
  }

  function startResizeDrag(event) {
// $dragContext
  }

  function startMoveDrag(event) {
    const casement = findCasement(event);
    const bounds = casement.getCasementWindow().getBoundingClientRect();

    $$dragContext = { moving:true,
      originX: bounds.x - event.clientX,
      originY: bounds.y - event.clientY,
      casement: casement,
    };

    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mousemove', moveWindow);
  }

  function moveWindow(event) {
    $$dragContext.casement.moveTo({
      x: event.clientX + $$dragContext.originX,
      y: event.clientY + $$dragContext.originY,
    });
  }

  function stopDrag() {
    if ($$dragContext) {
      if ($$dragContext.moving) {
        document.removeEventListener('mousemove', moveWindow);
      }
      $$dragContext = null;
    }
  }

  return Object.freeze({
    init,
    fromPath,
  });

})();
