window.TileShelfContainer = (function() {

  let $shelf

  create(application) {
    const leftTrim = new PIXI.Graphics()
    const rightTrim = new PIXI.Graphics()
    const center = new PIXI.Graphics()

    $shelf = new PIXI.Container();
  }

  return Object.freeze({
    create;
  })

})();