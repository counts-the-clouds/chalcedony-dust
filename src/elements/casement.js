global.Casement = function(options) {

  const $content = options.content;

  Validate.exists('Content Element',$content);

  function open() {
    X.first('#casementsArea').appendChild($content);
    console.log("Open Casement:",$content)
  }

  return Object.freeze({
    open,
  });

}

Casement.fromPath = function(path) {
  return new Promise(resolve => {
    const content = document.createElement('div');
    content.setAttribute('class','casement-content');
    content.innerHTML = FileHelper.readFile(path);

    resolve(Casement({ content }));
  });
}
