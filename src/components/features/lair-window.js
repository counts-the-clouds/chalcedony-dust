global.LairWindow = (function() {

  function open(feature) {
    const room = feature.getConstruction();

    const casement = FeatureWindows.openCasementWith(feature,build(feature,room));
    casement.setTitle(room.getDisplayName());
    casement.setBounds(getBounds());
    casement.setBackground('rgb(17,19,17)');

    const content = casement.getCasementContent();
    content.querySelector('.summon-button').addEventListener('click', () => {
      console.log(`Summon ${room.getLairData().species}!`);
    });
  }

  function build(feature, room) {
    const lairData = room.getLairData();
    const species = Species(lairData.species);
    const minionIDs = room.getDomiciledMinions();
    const capacity = room.getDomiciledMinionCapacity();

    let html = `<div class='lair-window'>`
    html += `<div class='header'>${room.getDetails()}</div>`

    if (capacity > room.getDomiciledMinionCount()) {
      html += `<div class='actions'>
        ${CostPanel.build(lairData.cost)}
        <div class='buttons'>
          <div class='summon-button button button-primary button-big'>Summon ${species.getName()}</div>
        </div>
      </div>`
    }

    html += `<ul class='minion-list'>`
    for (let i=0; i<capacity; i++) {
      html += (minionIDs[i] == null) ? `<li class='empty'>Empty</li>` : buildMinionItem(minionIDs[i]);
    }
    html += `</ul>`

    return `${html}</div>`
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
