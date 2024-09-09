global.WorkerControl = (function() {

  function init() {
    X.onClick('.worker-control .worker-list li.minion', openMinionSelect);
    X.onClick('.worker-control .select-list li.minion', selectMinion);
  }

  function build(feature) {
    const construction = feature.getConstruction();

    const list = X.createElement(`<ul class='worker-list'></ul>`);
    const workerSelect = X.createElement(`<div class='worker-select hide'></div>`);
    buildSlots(list, construction);

    const control = X.createElement(`<div class='worker-control' data-feature-id='${feature.getID()}'></div>`);
    control.appendChild(list);
    control.appendChild(workerSelect);

    workerSelect.addEventListener('mouseleave', () => { closeMinionList(control); })

    return control;
  }

  function buildSlots(list, construction) {
    const configuration = construction.getWorkerConfiguration();
    const workerMap = construction.getWorkerMap();

    // TODO: When we build list list we should display the skill (or any other
    //       appropriate bonus that the minion has for this job. Currently we
    //       don't really have skills or skills associated with job, but we
    //       will at some point.
    const skill = 'mining'

    list.innerHTML = '';

    for (let i=0; i<configuration.slots; i++) {
      list.appendChild(workerMap[i] ?
        buildMinionItem(MinionDataStore.get(workerMap[i]), i, skill) :
        buildEmptySlot(i));
    }
  }

  function buildEmptySlot(slot) {
    return X.createElement(`<li class='minion empty' data-slot='${slot}'>Select Minion</li>`);
  }

  // TODO: Get actual skill bonus from the minion.
  function buildMinionItem(minion, slot, skill) {
    if (slot == null) { throw 'A slot is required'; }
    if (skill == null) { throw 'A skill is required'; }

    return X.createElement(`<li class='minion' data-slot='${slot}' data-id='${minion.getID()}'>
      <div class='species'>${minion.getSpecies().getName()}</div>
      <div class='name'>${minion.getFullName()}</div>
      <div class='skill'>${skill} 0</div>
    </li>`);
  }

  // === Open Minion Select =

  function openMinionSelect(event) {
    const control = event.target.closest('.worker-control');
    const slot = event.target.closest('.minion').getAttribute('data-slot');
    const position = X.getPosition(control);
    const workerList = X.createElement(`<ul class='select-list'><li class='minion empty' data-slot='${slot}'>(no one)</li></ul>`);

    const workerSelect = control.querySelector('.worker-select');
    workerSelect.innerHTML = '';
    workerSelect.appendChild(workerList);
    workerSelect.style.top = `${position.top}px`;
    workerSelect.style.left = `${position.left + 10}px`;
    workerSelect.style.minWidth = `${position.width - 21}px`;

    X.removeClass(workerSelect,'hide');

    const scrollingPanel = ScrollingPanel({ element:workerList });

    MinionHelper.allUnassignedMinions().forEach(id => {
      const minion = MinionDataStore.get(id);
      const item = buildMinionItem(minion,slot,'mining');
      workerList.appendChild(item);
    });

    scrollingPanel.setHeight(300);
    scrollingPanel.setContentHeight(workerList.scrollHeight);
    scrollingPanel.resize();
  }

  function closeMinionList(control) {
    const workerSelect = control.querySelector('.worker-select');
    workerSelect.innerHTML = '';
    X.addClass(workerSelect,'hide');
  }

  function selectMinion(event) {
    const control = event.target.closest('.worker-control');
    const selectItem = event.target.closest('.minion');
    const slot = selectItem.getAttribute('data-slot');
    const slotElement = getSlot(control, slot);
    const feature = FeatureDataStore.get(parseInt(control.getAttribute('data-feature-id')));

    closeMinionList(control);

    if (X.hasClass(selectItem,'empty')) {
      slotElement.replaceWith(buildEmptySlot(slot));
      feature.removeWorker(slot);
      return;
    }

    const minion = MinionDataStore.get(parseInt(selectItem.getAttribute('data-id')));
    slotElement.replaceWith(buildMinionItem(minion, slot, 'skill'));
    feature.assignWorker(slot, minion);
  }

  function getSlot(control, slot) {
    for (let item of control.querySelectorAll('.worker-list li.minion')) {
      if (item.getAttribute('data-slot') === `${slot}`) {
        return item;
      }
    }
  }

  return Object.freeze({
    init,
    build
  });

})();
