global.WorkerControl = (function() {

  function build(feature) {
    const construction = feature.getConstruction();

    const list = X.createElement(`<ul class='worker-list'></ul>`);
    const select = X.createElement(`<div class='worker-select hide'></div>`);
    buildSlots(list, construction);

    const control = X.createElement(`<div class='worker-control'></div>`);
    control.appendChild(list);
    control.appendChild(select);

    list.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', event => {
        openMinionList(feature, control);
      });
    });

    return control;
  }

  function buildSlots(list, construction) {
    const configuration = construction.getWorkerConfiguration();
    const workers = construction.getWorkers();

    list.innerHTML = '';

    for (let i=0; i<configuration.slots; i++) {
      const slot = X.createElement(`<li class='slot slot-${i}'><div class='remove'></div><div class='display'></div></li>`);
      const display = slot.querySelector('.display');

      if (workers[i]) {
        display.innerHTML = `<div class='name'>${workers[i].getFullName()}</div>`;
      } else {
        display.innerText = `Select Minion`;
        X.addClass(display,'empty');
        X.addClass(slot.querySelector('.remove'), 'hide');
      }

      list.appendChild(slot);
    }
  }

  function openMinionList(feature, control) {
    const select = control.querySelector('.worker-select');
    select.innerHTML = '';

    MinionHelper.allUnassignedMinions().forEach(id => {
      const minion = MinionDataStore.get(id);
      console.log(`Unassigned: ${minion}`);
    });
  }

  return Object.freeze({ build })

})();
