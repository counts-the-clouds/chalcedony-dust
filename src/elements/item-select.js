
global.ItemSelect = function(options) {
  const $feature = options.feature;
  const $slot = options.slot;
  const $onSelect = options.onSelect;

  Validate.exists('feature', $feature);
  Validate.exists('slot', $slot);
  Validate.exists('onSelect', $onSelect);

  const $ingredient = $feature.getConstruction().getIngredientSlot($slot);

  function build() {
    const itemSelect = X.createElement(`<div id='itemSelect${$feature.getID()}${$slot}' class='item-select'>
      <div class='icon empty'></div>
      <div class='name'>${$ingredient.displayName}</div>
    </div>`)

    if ($ingredient.required) { X.addClass(itemSelect,'required'); }

    itemSelect.addEventListener('click', openSelect);

    return itemSelect;
  }

  function openSelect(event) {
    const selectElement = event.target.closest('.item-select');
    const position = X.getPosition(selectElement);
    const itemList = getItemList();

    const listElement = X.createElement(`<ul class='item-list'></ul>`);
    listElement.appendChild(buildEmptyItemElement());

    Object.keys(itemList).forEach(code => {
      listElement.appendChild(buildItemElement(code, itemList[code]));
    });

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

  function buildEmptyItemElement() {
    const element = X.createElement(`<li class='item-element'><div class='empty'>(Nothing)</div></li>`);
    element.addEventListener('click', onSelect);
    return element;
  }

  function buildItemElement(itemCode) {
    const item = Item(itemCode);
    const itemElement = X.createElement(`<li class='item-element' data-code='${itemCode}'>
      <div class='icon icon-for-${itemCode}'></div>
      <div class='name'>${item.getName()}</div>
      ${AspectPanel.build(item.getArcaneAspects())}
    </li>`);

    itemElement.addEventListener('click', onSelect);

    return itemElement;
  }

  function getItemList() {
    if ($ingredient.requireAspect) { return GameInventory.withAspect($ingredient.requireAspect); }
    throw `No item qualifier in slot data, should this include all items or what?`
  }

  function closeSelect() {
    X.addClass('#selectArea','hide');
    X.first('#selectArea').innerHTML = '';
  }

  function onSelect(event) {
    const code = event.target.closest('.item-element').getAttribute('data-code');

    X.first(`#itemSelect${$feature.getID()}${$slot} .icon`).setAttribute('class', code == null ? 'icon empty' : `icon icon-for-${code}`);

    $onSelect({
      feature: $feature,
      slot: $slot,
      code: code,
    });

    closeSelect();
  }

  return Object.freeze({
    build
  });
}
