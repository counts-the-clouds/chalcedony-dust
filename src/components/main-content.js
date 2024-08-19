global.MainContent = (function() {
  // Just requiring PixiJS doesn't do anything, so I'll just add a script tag
  // to the head like some kind of boomer. I'm also not sure when Pixi
  // becomes available doing it this way.
  async function loadDependencies() {
    addScriptTag(`${APP}/lib/pixi.min.js`);
    await waitForPixi();
    global.Pixi = PIXI;

    const tween = await require(`${APP}/lib/tween.umd.js`);
    global.Tween = tween.Tween;
    global.Easing = tween.Easing;
  }

  // Because PixiJS is coming from a <script> tag that's added after the page
  // has already loaded, it takes a little while to show up. So we to wait a
  // few milliseconds for to finish loading before we do the rest of the
  // initialization.
  function waitForPixi() {
    return new Promise(resolve => {
      let interval = setInterval(() => {
        if (global.PIXI) {
          clearInterval(interval);
          resolve();
        }
      },10);
    });
  }

  function loadMainContent() {
    const mainContent = FileHelper.readFile('views/main-content.html');
    const mainElement = document.createElement("div");
          mainElement.innerHTML = mainContent;

    document.querySelector("body").append(mainElement.children[0]);
  }

  function loadStyles() {
    addStylesheet(`${APP}/styles/chalcedony.css`);
    addIconStyles();
  }

  function addScriptTag(src) {
    const script = document.createElement('script');
          script.setAttribute('src',src);

    document.getElementsByTagName('head')[0].appendChild(script);
  }

  function addStylesheet(href) {
    const link = document.createElement('link');
          link.setAttribute('rel','stylesheet');
          link.setAttribute('type','text/css');
          link.setAttribute('href',href);

    document.querySelector('head').appendChild(link);
  }

  function buildStyleSheet(string) {
    const style = document.createElement("style");
          style.textContent = string;

    document.querySelector('head').appendChild(style);
  }

  // Adding all of these asset URLs here is shitty, but chromium sanitizes
  // everything when setting an element's innerHTML. This makes it impossible
  // to set a style attribute that points to an asset URL. So instead I create
  // a style tag with all the URLs that I would have set on the elements. I'm
  // doing this as a promise because nothing is waiting on it and I don't
  // really care how long it takes.
  function addIconStyles() {
    return new Promise(resolve => {
      let iconStyles = `
        .icon-for-mana { background-image:${X.assetURL('icons/unknown.png')} }
      `;

      ItemRegistry.forEach((code,item) => {
        iconStyles += `.icon-for-${code} { background-image:${X.assetURL(`icons/${item.icon}`)} }\n`
      });

      buildStyleSheet(iconStyles);
      resolve();
    });
  }

  function setMainContent(path) {
    log(`Set Main Content`,{ system:'MainContent', data:path, level:1 });

    clearBackground();
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
    X.first('#backgroundImage').style['background-image'] = null;
  }

  return {
    loadDependencies,
    loadMainContent,
    loadStyles,
    setMainContent,
    addStylesheet,
    showCover,
    hideCover,
    setBackground,
    clearBackground,
  };

})();