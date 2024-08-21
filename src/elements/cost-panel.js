global.CostPanel = (function() {

  // CostPanels are built as a strings because I think normally we'll just
  // feed them directly into a createElement() function.
  function build(costMap) {
    let buffer = Object.keys(costMap).map(costCode =>
      `<div class='cost-item'>
         <div class='icon icon-for-${costCode}'></div>
         <span class='count'>${costMap[costCode]}</span>
         <span class='name'>${nameFor(costCode)}</span>
       </div>`
    ).join('');

    return `<div class='cost-panel'>${buffer}</div>`
  }

  function nameFor(code) {
    if (code === 'mana') { return 'Mana'; }
    return ItemRegistry.lookup(code).name;
  }

  return Object.freeze({
    build
  });

})();