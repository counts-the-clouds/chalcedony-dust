
function readFile(path) {
  return fs.readFileSync(`${APP}/${path}`, 'utf8');
}

global.Main = function() {
  window.APP = `${ROOT}/application`;

  try {
    loadStyles();
    loadMainContent();
    initialize();

    log("Chalcedony Started",{ system:'Main', data:{
      environment: Environment.name,
    }});
  }
  catch(error) {
    console.error(error);
  }
}

function initialize() {
  Elements.initAll();
  Console.init();
}

function loadStyles() {
  const link = document.createElement('link');
        link.setAttribute('rel','stylesheet');
        link.setAttribute('type','text/css');
        link.setAttribute('href',`${APP}/styles/chalcedony.css`);

  document.getElementsByTagName('head')[0].appendChild(link);
}

function loadMainContent() {
  const mainContent = readFile('views/main-content.html');
  const mainElement = document.createElement("div");
        mainElement.innerHTML = mainContent;

  document.querySelector("body").append(mainElement.children[0]);
}
