global.Effects = (function() {

  function flashSquare(selector, options={}) {
    const bounds = X.first(selector).getBoundingClientRect();

    const flash = X.createElement(`<div class='flash-square'></div>`);
    flash.style.top = `${bounds.top}px`;
    flash.style.left = `${bounds.left}px`;
    flash.style.height = `${bounds.height}px`;
    flash.style.width = `${bounds.width}px`;

    X.first('#effectArea').appendChild(flash);

    AnimationController.addAnimation('dom-fade-out',`Flash[${selector}]`,{
      element: flash,
      onComplete: () => { flash.remove(); },
    });
  }

  return Object.freeze({
    flashSquare,
  });

})();
