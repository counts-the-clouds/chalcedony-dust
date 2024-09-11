global.LairWindow = (function() {

  function open(feature) {
    if (FeatureWindows.windowNotOpen(feature)) {
      const room = feature.getConstruction();

      const casement = FeatureWindows.openCasementWith(feature,build(feature,room));
      casement.setTitle(room.getDisplayName());
      casement.setBounds(getBounds());
      casement.setBackground('rgb(17,19,17)');

      const content = casement.getCasementContent();
      const summonButton = content.querySelector('.summon-button');

      if (summonButton) {
        summonButton.addEventListener('click', event => {
          if (X.hasClass(event.target.closest('.button'),'disabled') === false) {
            summonMinion(room, casement);
          }
        });
      }
    }
  }

  function build(feature, room) {
    const minion = Minion(room.getData().lair);
    const status = MinionRoster.getLairStatus(room.getID());
    const disabled = (status.minionCount >= status.minionMax) ? 'disabled' : '';

    return `<div class='lair-window'>
      <div class='header'></div>
      <div class='details'>${room.getDetails()}</div>
      <div class='status'>${buildStatusText(status,minion)}</div>
      <div class='action'>
        ${CostPanel.build(minion.getCost())}
        <div class='button button-big button-primary summon-button ${disabled}'>Summon ${minion.getName()}</div>
      </div>
    </div>`
  }

  function buildStatusText(status,minion) {
    const name = (status.minionCount === 1) ? minion.getName() : minion.getPluralName();

    return `<span class='summoned'>${status.minionCount}</span>
            <span class='name'>${name}</span> out of
            <span class='total'>${status.minionMax}</span> have been summoned.`;
  }

  function getBounds() {
    const position = MouseMonitor.getPosition();
    const top = position.y - 100;
    const left = position.x - 200;
    return { top, left, height:260, width:400 }
  }

  // TODO: We need to disable the summon button if we can't afford the minion
  //       cost. This should be a common function that listens for inventory
  //       and mana changes. This shouldn't be too taxing, we shouldn't have
  //       that many lair windows open at once.
  //
  async function summonMinion(room, casement) {
    MinionRoster.summonMinion(room.getID());

    const minion = Minion(room.getData().lair);
    const status = MinionRoster.getLairStatus(room.getID());
    const full = status.minionCount >= status.minionMax;

    const content = casement.getCasementContent();
    const statusPanel = content.querySelector('.status');
    statusPanel.innerHTML = buildStatusText(status, minion);

    if (full) {
      X.addClass(content.querySelector('.summon-button'),'disabled');
    }

    await GameState.saveState();
  }

  return Object.freeze({
    open
  })

})();
