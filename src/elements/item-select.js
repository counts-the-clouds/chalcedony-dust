global.ItemSelect = (function() {

  function init() {
    X.onClick('.item-select', openSelect);
  }

  function build(options) {
    const ingredientSlot = options.ingredientSlot;

    const element = `<div class='item-select empty' data-code='${ingredientSlot.code}'>
      <div class='icon empty'></div>
      <div class='name'>${ingredientSlot.displayName}</div>
    </div>`

    return element;
  }

  function openSelect(event) {
    const selectElement = event.target.closest('.item-select');
    const position = X.getPosition(selectElement);

    const listElement = X.createElement(`<ul class='item-list'></ul>`);

    const itemSelectWindow = X.createElement(`<div class='item-select-window'></div>`);
    itemSelectWindow.addEventListener('mouseleave', closeSelect);
    itemSelectWindow.appendChild(listElement);

    const selectArea = X.first('#selectArea');
    selectArea.innerHTML = '';
    selectArea.appendChild(itemSelectWindow);

    X.removeClass(selectArea,'hide');

    itemSelectWindow.style.top = `${position.top}px`;
    itemSelectWindow.style.left = `${position.left}px`;
    itemSelectWindow.style.height = `${Math.min(300,listElement.scrollHeight)}px`;

    if (listElement.scrollHeight > 300) {
      const scrollingPanel = ScrollingPanel({ element:listElement });
      scrollingPanel.setHeight(300);
      scrollingPanel.setContentHeight(listElement.scrollHeight);
      scrollingPanel.resize();
    }
  }

  function closeSelect() {
    X.addClass('#selectArea','hide');
    X.first('#selectArea').innerHTML = '';
  }

  return Object.freeze({
    init,
    build
  });

})();
