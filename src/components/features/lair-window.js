global.LairWindow = (function() {

  function open(feature) {
    if (FeatureWindows.windowNotOpen(feature)) {
      const room = feature.getConstruction();

      const casement = FeatureWindows.openCasementWith(feature,build(feature,room));
      casement.setTitle(room.getDisplayName());
      casement.setBounds(getBounds());
      casement.setBackground('rgb(17,19,17)');

      // const content = casement.getCasementContent();
      // const summonButton = content.querySelector('.summon-button');
      //
      // if (summonButton) {
      //   summonButton.addEventListener('click', () => {
      //     summonMinion(feature, casement);
      //   });
      // }

      // content.querySelector('.list-container').appendChild(MinionElements.buildMinionListForLair(room));
    }
  }

  function build(feature, room) {
    const minionCode = room.getData().lair;
    const minion = Minion(minionCode);
    const status = MinionRoster.getLairStatus(room.getID());

    return `<div class='lair-window'>
      <div class='header'></div>
      <div class='details'>${room.getDetails()}</div>
      <div class='status'>
        <span class='summoned'>${status.minionCount}</span> out of
        <span class='total'>${status.minionMax}</span> summoned.
      </div>
      <div class='action'>
        ${CostPanel.build(minion.getCost())}
        <div class='button button-primary summon-minion-button'>Summon ${minion.getName()}</div>
      </div>
    </div>`
  }

  function getBounds() {
    const position = MouseMonitor.getPosition();
    const top = position.y - 100;
    const left = position.x - 200;
    return { top, left, height:260, width:400 }
  }

  // === Summoning =============================================================

  // === WIP ===
  async function summonMinion(feature, casement) {
    throw 'summonMinion() - WIP'

    // const room = feature.getConstruction();
    // const lairData = room.getLairData();
    // const minion = MinionBuilder.build({ species:lairData.species });
    //
    // const root = casement.getCasementContent();
    // const listItem = firstEmptyItem(root);
    // const minionItem = MinionElements.buildMinionItem(minion.getID(), true);
    //
    // listItem.replaceWith(minionItem);
    //
    // room.addMinion(minion);
    //
    // // TODO: Actually spend the resources needed to summon the minion.
    //
    // // TODO: Also need to disable the summon button if we can't afford the
    // //       minion cost. This should be a common function that listens for
    // //       inventory changes as well.
    //
    // if (emptyItemExists(root) === false) {
    //   root.querySelector('.actions').remove();
    //   casement.contentResized();
    // }
    //
    // Effects.fadeOut({
    //   element: minionItem.querySelector('.flash'),
    //   id:`Minion-${minion.getID()}`
    // });
    //
    // await GameState.saveState();
  }

  function emptyItemExists(root) {
    return root.querySelector('.minion-list li.empty') != null;
  }

  function firstEmptyItem(root) {
    return root.querySelectorAll('.minion-list li.empty')[0];
  }


  return Object.freeze({
    open
  })

})();
