global.WorkerControl = (function() {

  function build(feature) {
    const construction = feature.getConstruction();

    const list = X.createElement(`<ul class='worker-list'></ul>`);
    const workerSelect = X.createElement(`<div class='worker-select hide'></div>`);
    buildSlots(list, construction);

    const control = X.createElement(`<div class='worker-control'></div>`);
    control.appendChild(list);
    control.appendChild(workerSelect);

    workerSelect.addEventListener('mouseleave', () => { closeMinionList(control); })

    list.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', event => {
        openMinionList(feature, control, event.target.getAttribute('data-slot'));
      });
    });

    return control;
  }

  function buildSlots(list, construction) {
    const configuration = construction.getWorkerConfiguration();
    const workers = construction.getWorkers();

    // TODO: When we build list list we should display the skill (or any other
    //       appropriate bonus that the minion has for this job. Currently we
    //       don't really have skills or skills associated with job, but we
    //       will at some point.
    const skill = 'mining'

    list.innerHTML = '';

    for (let i=0; i<configuration.slots; i++) {
      list.appendChild(workers[i] ?
        buildMinionItem(workers[i], skill, i) :
        X.createElement(`<li class='minion empty' data-slot='${i}'>Select Minion</li>`));
    }
  }

  // TODO: Get actual skill bonus from minion.
  function buildMinionItem(minion, skill, i) {
    const element = X.createElement(`<li class='minion'>
      <div class='remove'></div>
      <div class='species'>${minion.getSpecies().getName()}</div>
      <div class='name'>${minion.getFullName()}</div>
      <div class='skill'>${skill} 0</div>
    </li>`);

    if (i != null) {
      element.setAttribute(`data-slot`,`${i}`);
    }

    return element;
  }

  function openMinionList(feature, control, slot) {
    const position = X.getPosition(control);
    const workerList = X.createElement(`<ul class='select-list'></ul>`);
    const workerSelect = control.querySelector('.worker-select');
    workerSelect.appendChild(workerList);
    workerSelect.style.top = `${position.top}px`;
    workerSelect.style.left = `${position.left + 10}px`;

    X.removeClass(workerSelect,'hide');

    MinionHelper.allUnassignedMinions().forEach(id => {
      const minion = MinionDataStore.get(id);
      const item = buildMinionItem(minion,'mining');
      item.addEventListener('click', () => { selectMinion(slot, control, minion, feature); });
      workerList.appendChild(item);
    });
  }

  function closeMinionList(control) {
    const workerSelect = control.querySelector('.worker-select');
    workerSelect.innerHTML = '';
    X.addClass(workerSelect,'hide');
  }

  function selectMinion(slot, control, minion, feature) {
    closeMinionList(control);
    console.log(`Selected - Slot:${slot} ${minion} ${feature}`);
  }

  return Object.freeze({ build })

})();
