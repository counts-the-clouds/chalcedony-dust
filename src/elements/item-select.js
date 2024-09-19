global.ItemSelect = (function() {

  function init() {
    X.onClick('.item-select', openSelect);
  }

  function build(options) {
    const feature = FeatureDataStore.get(options.featureID);
    const ingredient = feature.getConstruction().getIngredientSlot(options.slotCode);

    const element = `<div class='item-select empty' data-feature-id='${options.featureID}' data-slot='${options.slotCode}'>
      <div class='icon empty'></div>
      <div class='name'>${ingredient.displayName}</div>
    </div>`

    return element;
  }

  function openSelect(event) {
    const selectElement = event.target.closest('.item-select');
    const position = X.getPosition(selectElement);
    const feature = FeatureDataStore.get(parseInt(selectElement.getAttribute('data-feature-id')));
    const room = feature.getConstruction();
    const slot = selectElement.getAttribute('data-slot');

    console.log("Feature:",feature,slot,room.getIngredientSlot(slot));

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
