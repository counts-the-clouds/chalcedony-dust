global.MinionElements = (function() {

  function buildMinionListForLair(lair) {
    const capacity = lair.getDomiciledMinionCapacity();
    const minionIDs = lair.getDomiciledMinions();

    let list = X.createElement(`<ul class='minion-list'></ul>`)
    for (let i=0; i<capacity; i++) {
      list.appendChild(minionIDs[i] == null ? X.createElement(`<li class='empty'>Empty</li>`) : buildMinionItem(minionIDs[i]));
    }

    return list
  }

  function buildMinionItem(id, withFlash=false) {
    const minion = MinionDataStore.get(id);

    return X.createElement(`<li class='minion'>
      <div class='body'>
        ${withFlash ? `<div class='flash'></div>` : ''}
        <div class='top-row'><a href='#' class='open-minion-window' data-minion-id='${id}'>${minion.getFullName()}</a></div>
        <div class='bottom-row'>${TextHelper.titlecase(minion.getGender())} ${minion.getSpecies().getName()}</div>
      </div>
    </li>`);
  }

  return Object.freeze({
    buildMinionListForLair,
    buildMinionItem,
  });

})();
