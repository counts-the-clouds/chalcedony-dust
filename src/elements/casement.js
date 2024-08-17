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

  function getAssociatedCasements(association) {
    return Object.values($$currentCasements).filter(casement => {
      return casement.getAssociatedWith() === association;
    });
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
          <div class='resize-handle'></div>
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

    let $associatedWith;
    let $bounds = {};

    function getID() { return $id }
    function getCasementContent() { return $casementContent; }
    function getCasementWindow() { return $casementWindow; }

    $casementWindow.querySelector('.casement-bar').addEventListener('mousedown', event => startMoveDrag(event));
    $casementWindow.querySelector('.resize-handle').addEventListener('mousedown', event => startResizeDrag(event));

    function setAssociatedWith(association) { $associatedWith = association; }
    function getAssociatedWith() { return $associatedWith; }

    function setTitle(title) {
      $casementWindow.querySelector('h1.title').innerHTML = title;
    }

    function getBounds() { return $bounds; }
    function setBounds(bounds) {
      $bounds = bounds;
      reposition();
    }

    function setLocation(point) {
      $bounds.left = point.x;
      $bounds.top = point.y;
      reposition();
    }

    function setSize(size) {
      $bounds.height = size.height;
      $bounds.width = size.width;
      reposition();
    }

    function reposition() {
      if ($bounds.height < 200) { $bounds.height = 200; }
      if ($bounds.width < 300) { $bounds.width = 300; }
      if ($bounds.height > window.innerHeight - 100) { $bounds.height = window.innerHeight - 100; }
      if ($bounds.width > window.innerWidth - 100) { $bounds.width = window.innerWidth - 100; }

      if ($bounds.top < 0) { $bounds.top = 0; }
      if ($bounds.left < 0) { $bounds.left = 0; }
      if ($bounds.left + $bounds.width + (_borderWidth*2) > window.innerWidth) {
        $bounds.left = window.innerWidth - $bounds.width - (_borderWidth*2); }
      if ($bounds.top + $bounds.height + (_borderWidth*2) > window.innerHeight) {
        $bounds.top = window.innerHeight - $bounds.height - (_borderWidth*2);
      }

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
      setAssociatedWith,
      getAssociatedWith,
      setTitle,
      setBounds,
      getBounds,
      setLocation,
      setSize,
      close,
    });
  }

  function startMoveDrag(event) {
    const casement = findCasement(event);
    const bounds = casement.getBounds();

    $$dragContext = {
      moving: true,
      casement: casement,
      origin: {
        x: (bounds.left - event.clientX),
        y: (bounds.top - event.clientY)
      }
    };

    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mousemove', moveWindow);
  }

  function startResizeDrag(event) {
    const casement = findCasement(event);
    const bounds = casement.getBounds();

    $$dragContext = {
      resizing: true,
      casement: casement,
      origin: { x:event.clientX, y:event.clientY },
      size: { height:bounds.height, width:bounds.width },
    };

    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mousemove', resizeWindow);
  }

  function moveWindow(event) {
    $$dragContext.casement.setLocation({
      x: event.clientX + $$dragContext.origin.x,
      y: event.clientY + $$dragContext.origin.y,
    });
  }

  function resizeWindow(event) {
    if (event.clientX + _borderWidth < window.innerWidth && event.clientY + _borderWidth < window.innerHeight) {
      const width = (event.clientX - $$dragContext.origin.x) + $$dragContext.size.width;
      const height = (event.clientY - $$dragContext.origin.y) + $$dragContext.size.height;
      $$dragContext.casement.setSize({ height,width });
    }
  }

  function stopDrag() {
    if ($$dragContext) {
      document.removeEventListener('mouseup', stopDrag);
      if ($$dragContext.moving) { document.removeEventListener('mousemove', moveWindow); }
      if ($$dragContext.resizing) { document.removeEventListener('mousemove', resizeWindow); }
      $$dragContext = null;
    }
  }

  return Object.freeze({
    init,
    fromPath,
    getAssociatedCasements,
  });

})();
