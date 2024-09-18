global.ItemSelect = (function() {

  function build(options) {
    const ingredientSlot = options.ingredientSlot;

    console.log("Build ItemSelect With:",ingredientSlot);

    const element = `<div class='item-select' data-code='${ingredientSlot.code}'>
      <div class='icon'>XXX</div>
      <div class='name'>${ingredientSlot.displayName}</div>
    </div>`

    return element;
  }

  return Object.freeze({ build });

})();



