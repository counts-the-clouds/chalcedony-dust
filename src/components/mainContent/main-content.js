global.MainContent = (function() {

  function loadMainContent() {
    const mainContent = FileHelper.readFile('views/main-content.html');
    const mainElement = document.createElement("div");
          mainElement.innerHTML = mainContent;

    document.querySelector("body").append(mainElement.children[0]);
  }

  function loadStyles() {
    const link = document.createElement('link');
          link.setAttribute('rel','stylesheet');
          link.setAttribute('type','text/css');
          link.setAttribute('href',`${APP}/styles/chalcedony.css`);

    document.getElementsByTagName('head')[0].appendChild(link);
  }

  function setMainContent(path) {
    X.loadDocument('#mainContent',path);
    if (Environment.isProduction) {
      X.remove('.show-in-development');
    }
  }

  function showCover() {
    X.removeClass('#mainCover','hide');
  }

  // TODO: I feel like this complicated timeout layering could be abstracted
  //       away into another transition helper or some such.
  function hideCover(options={}) {
    const duration = options.fadeTime || 500;
    const cover = X.first('#mainCover');

    setTimeout(() => {
      cover.style['transition-property'] = 'opacity';
      cover.style['transition-duration'] = `${duration}ms`;
      cover.style['opacity'] = 1;
    },10);

    setTimeout(() => {
      cover.style['opacity'] = 0;
    },20);

    setTimeout(() => {
      X.addClass(cover,'hide');
      X.removeAttribute(cover,'style')
    },duration+30);
  }

  function setBackground(path) {
    X.first('#backgroundImage').style['background-image'] = X.assetURL(path);
  }

  function clearBackground() {
    delete X.first('#backgroundImage').style['background-image'];
  }

  return {
    loadMainContent,
    loadStyles,
    setMainContent,
    showCover,
    hideCover,
    setBackground,
    clearBackground,
  };

})();