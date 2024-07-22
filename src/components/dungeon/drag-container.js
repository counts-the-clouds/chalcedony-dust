window.DragContainer = (function() {

  let $field;

  function init() {
    window.addEventListener("resize", handleResize);
  }

  function create(application) {
    $field = PIXI.Container();
    $field.x = 0;
    $field.y = 0;

    application.stage.addChild($field);

    positionField();
  }

  function handleResize() {
    // Not sure if we need to do anything on resize or not yet,
  }

  return Object.freeze({
    init,
    create,
  });

})();