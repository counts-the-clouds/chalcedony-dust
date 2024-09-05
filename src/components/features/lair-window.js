global.LairWindow = (function() {

  function open(feature) {
    const room = feature.getConstruction();

    const casement = FeatureWindows.openCasementWith(feature,build(feature,room));
    casement.setTitle(room.getDisplayName());
    casement.setBounds(getBounds());
    casement.setBackground('rgb(17,19,17)');
  }

  function build(feature, room) {
    const lairData = room.getLairData();
    const species = Species(lairData.species);
    const minionIDs = room.getDomiciledMinions();
    const capacity = room.getDomiciledMinionCapacity();

    let html = `<div>Capacity:${capacity}</div><ul class='minion-list'>`

    for (let i=0; i<capacity; i++) {
      html += (minionIDs[i] == null) ? `<li class='empty'>Empty</li>` : buildMinionItem(minionIDs[i]);
    }

    html += `</ul>`

    if (capacity > room.getDomiciledMinionCount()) {
      html += `<div><div class='button button-primary'>Summon ${species.getName()}</div></div>`
    }

    return html
  }

  function buildMinionItem(minionID) {
    const minion = MinionDataStore.get(minionID);
    return `<li>Minion: ${minion.getFullName()}</li>`
  }

  function getBounds() {
    const position = MouseMonitor.getPosition();
    const top = position.y - 100;
    const left = position.x - 200;
    return { top, left, height:600, width:400 }
  }

  return Object.freeze({
    open
  })

})();
