global.LairWindow = (function() {

  function open(feature) {
    if (FeatureWindows.windowNotOpen(feature)) {
      const room = feature.getConstruction();

      const casement = FeatureWindows.openCasementWith(feature,build(feature,room));
      casement.setTitle(room.getDisplayName());
      casement.setBounds(getBounds());
      casement.setBackground('rgb(17,19,17)');

      const content = casement.getCasementContent();
      content.querySelector('.summon-button').addEventListener('click', () => {
        summonMinion(feature, casement);
      });

      content.querySelector('.list-container').appendChild(MinionElements.buildMinionListForLair(room));
    }
  }

  function build(feature, room) {
    const lairData = room.getLairData();
    const species = Species(lairData.species);
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

    html += `<div class='list-container'></div>`

    return `${html}</div>`
  }

  function getBounds() {
    const position = MouseMonitor.getPosition();
    const top = position.y - 100;
    const left = position.x - 200;
    return { top, left, height:600, width:400 }
  }

  // === Summoning =============================================================

  async function summonMinion(feature, casement) {
    const room = feature.getConstruction();
    const lairData = room.getLairData();
    const minion = MinionBuilder.build({ species:lairData.species });

    const root = casement.getCasementContent();
    const listItem = firstEmptyItem(root);
    const minionItem = MinionElements.buildMinionItem(minion.getID());

    listItem.replaceWith(minionItem);

    room.addMinion(minion);

    // TODO: Actually spend the resources needed to summon the minion.

    // TODO: Also need to disable the summon button if we can't afford the
    //       minion cost. This should be a common function that listens for
    //       inventory changes as well.

    if (emptyItemExists(root) === false) {
      root.querySelector('.actions').remove();
      casement.contentResized();
    }

    await GameState.saveState();
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
