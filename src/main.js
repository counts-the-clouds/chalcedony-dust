
function readFile(path) {
  return fs.readFileSync(`${APP}/${path}`, 'utf8');
}

global.Main = function() {
  console.log("Hello Distant Thunder");
  console.log("   Environment",Environment);
  console.log("   Configuration",Configuration);

  window.APP = `${ROOT}/application`;

  try {
    const mainContent = readFile('views/main-content.html');
    const mainElement = document.createElement("div");
          mainElement.innerHTML = mainContent;

    document.querySelector("body").append(mainElement.children[0]);
  }
  catch(error) {
    console.error(error);
  }
}
