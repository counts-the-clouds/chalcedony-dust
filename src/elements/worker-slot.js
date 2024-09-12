global.WorkerSlot = (function() {

  function init() {
    X.onClick('li.worker-slot .slot-select', openSelect);
    X.onClick('#selectArea .minion-list .minion-item', minionSelected);
  }

  function build(featureID, slot, slotData) {
    let minionName = `<div class='empty'>Assign Minion</div>`
    let minionSkill = ``

    if (slotData.assignedMinion) {
      const minion = Minion(slotData.assignedMinion);
      minionName = `<div class='minion-name'>${minion.getName()}</div>`;

      if (slotData.requiredSkill) {
        minionSkill = `<div class='minion-skill positive'>+${minion.getSkill(slotData.requiredSkill)}</div>`;
      }
    }

    return `<li class='worker-slot' data-feature-id='${featureID}' data-slot='${slot}'>
      <div class='slot-name'>${slotData.name}</div>
      <div class='slot-select'>${minionName}${minionSkill}</div>
    </li>`
  }

  function openSelect(event) {
    const slotItem = event.target.closest('li.worker-slot');
    const position = X.getPosition(slotItem.querySelector('.slot-select'));
    const slot = slotItem.getAttribute('data-slot');
    const featureID = parseInt(slotItem.getAttribute('data-feature-id'));
    const feature = FeatureDataStore.get(featureID);
    const slotData = feature.getConstruction().getSlots()[slot];
    const minionMap = MinionRoster.getMinionMap();

    const listElement = X.createElement(`<ul class='minion-list'>
      <li class='minion-item empty'>None</li>
    </ul>`);

    const selectElement = X.createElement(`<div class='select' data-feature-id='${featureID}' data-slot='${slot}'></div>`);
    selectElement.addEventListener('mouseleave', closeSelect);
    selectElement.appendChild(listElement);
    selectElement.style.top = `${position.top}px`;
    selectElement.style.left = `${position.left}px`;
    selectElement.style.minWidth = `${position.width-1}px`;

    Object.keys(minionMap).forEach(code => {
      const minion = Minion(code);
      const minionData = minionMap[code];

      if (minionData.assigned < minionData.summoned) {
        if (slotData.requiredSkill == null || minion.hasSkill(slotData.requiredSkill)) {
          listElement.appendChild(buildMinionItem(minion, slotData.requiredSkill));
        }
      }
    });

    const selectArea = X.first('#selectArea');
    selectArea.innerHTML = '';
    selectArea.appendChild(selectElement);

    X.removeClass(selectArea,'hide')

    if (listElement.scrollHeight > 300) {
      const scrollingPanel = ScrollingPanel({ element:listElement });
      scrollingPanel.setHeight(300);
      scrollingPanel.setContentHeight(listElement.scrollHeight);
      scrollingPanel.resize();
    }
  }

  function buildMinionItem(minion, requiredSkill) {
    let skillElement = (requiredSkill == null) ? '' : `<div class='minion-skill'>
      <span class='skill-name'>${Skills[requiredSkill].name}</span>
      <span class='skill-value'>+${minion.getSkill(requiredSkill)}</span>
    </div>`;

    return X.createElement(`<li class='minion-item' data-minion-code='${minion.getCode()}'>
      <div class='minion-name'>${minion.getName()}</div>${skillElement}
    </li>`);
  }

  function minionSelected(event) {
    const minionItem = event.target.closest('.minion-item');
    const minionSelect = minionItem.closest('.select');

    const minionCode = minionItem.getAttribute('data-minion-code');
    const featureID = parseInt(minionSelect.getAttribute('data-feature-id'));
    const feature = FeatureDataStore.get(featureID);
    const slot = minionSelect.getAttribute('data-slot');

    console.log(`Set: ${feature}/${slot} = ${minionCode}`);

    closeSelect();
  }

  function closeSelect() {
    X.addClass('#selectArea','hide');
    X.first('#selectArea').innerHTML = '';
  }

  return Object.freeze({
    init,
    build,
  });

})();
