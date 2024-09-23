global.ItemSelect = (function() {

  const $itemSelects = {};

  function init() {
    X.onClick('.item-select', openSelect);
    X.onClick('.item-select-window .item-element', onSelect);
  }

  function storeSelect(options) { $itemSelects[`${options.featureID}:${options.slotCode}`] = options; }
  function getSelect(id,slot) { return $itemSelects[`${id}:${slot}`]; }
  function deleteSelect(id,slot) { delete $itemSelects[`${id}:${slot}`]; }

  function build(options) {
    Validate.exists('featureID', options.featureID);
    Validate.exists('slotCode', options.slotCode);
    Validate.exists('onSelect', options.onSelect);

    const featureID = options.featureID;
    const slotCode = options.slotCode;
    const onSelect = options.onSelect
    const feature = FeatureDataStore.get(featureID);
    const ingredient = feature.getConstruction().getIngredientSlot(slotCode);

    let classname = 'item-select';
    /* TODO: If empty */       classname += ` empty`;
    if (ingredient.required) { classname += ` required`; }

    const itemSelectElement = `<div id='itemSelect(${featureID}:${slotCode})' class='${classname}' data-feature-id='${featureID}' data-slot='${slotCode}'>
      <div class='icon empty'></div>
      <div class='name'>${ingredient.displayName}</div>
    </div>`

    storeSelect({
      featureID,
      slotCode,
      onSelect,
    })

    return itemSelectElement;
  }

  function openSelect(event) {
    const selectElement = event.target.closest('.item-select');
    const position = X.getPosition(selectElement);
    const feature = FeatureDataStore.get(parseInt(selectElement.getAttribute('data-feature-id')));
    const room = feature.getConstruction();
    const slot = selectElement.getAttribute('data-slot');
    const slotData = room.getIngredientSlot(slot)
    const itemList = getItemList(slotData);

    const listElement = X.createElement(`<ul class='item-list'>
      <li class='item-element'><div class='empty'>(Nothing)</div></li>
    </ul>`);

    Object.keys(itemList).forEach(code => {
      listElement.appendChild(buildItemElement(code, itemList[code]));
    });

    const itemSelectWindow = X.createElement(`<div class='item-select-window' data-feature-id='${feature.getID()}' data-slot='${slot}'></div>`);
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

  function buildItemElement(itemCode) {
    const item = Item(itemCode);
    return X.createElement(`<li class='item-element' data-code='${itemCode}'>
      <div class='icon icon-for-${itemCode}'></div>
      <div class='name'>${item.getName()}</div> 
      ${AspectPanel.build(item.getArcaneAspects())}
    </li>`);
  }

  function getItemList(slotData) {
    if (slotData.requireAspect) { return GameInventory.withAspect(slotData.requireAspect); }
    throw `No item qualifier in slot data, should this include all items or what?`
  }

  function closeSelect() {
    X.addClass('#selectArea','hide');
    X.first('#selectArea').innerHTML = '';
  }

  function onSelect(event) {
    const itemElement = event.target.closest('.item-element');
    const itemSelectWindow = event.target.closest('.item-select-window');

    const code = itemElement.getAttribute('data-code');
    const slot = itemSelectWindow.getAttribute('data-slot');
    const featureID = itemSelectWindow.getAttribute('data-feature-id');

    const selectOptions = getSelect(featureID,slot);
    selectOptions.onSelect({ code, ...selectOptions });

    closeSelect();
  }

  return Object.freeze({
    init,
    build,
    getSelect,
    deleteSelect,
  });

})();
