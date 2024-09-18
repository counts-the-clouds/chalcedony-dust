global.ItemSelect = (function() {

  function build(options) {
    const ingredientSlot = options.ingredientSlot;

    console.log("Build ItemSelect With:",ingredientSlot);

    const element = `<div class='item-select empty' data-code='${ingredientSlot.code}'>
      <div class='icon empty'></div>
      <div class='name'>${ingredientSlot.displayName}</div>
    </div>`

    return element;
  }

  return Object.freeze({ build });

})();



