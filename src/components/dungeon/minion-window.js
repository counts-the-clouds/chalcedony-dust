global.MinionWindow = (function() {

  let $slideWindow;

  function build() {
    $slideWindow = SlideWindow({ selector:'#minionsWindow' });
    updateHeader();
    updateMinions();

    Panopticon.addObserver(Observer(EventType.minionSummoned, () => {
      updateHeader();
      updateMinions();
    }));

    Panopticon.addObserver(Observer(EventType.constructionComplete, data => {
      if (BlueprintRegistry.lookup(data.code).type === TileType.room) {
        if (RoomRegistry.lookup(data.code).isLair) { updateHeader(); }
      }
    }));
  }

  function updateHeader() {
    const lairs = RoomDataStore.all().filter(room => room.isLair());

    if (lairs.length === 0) {
      return $slideWindow.setHeader(X.createElement(`<span class='minions-state empty'>There are no active lairs.</span>`))
    }

    let totalCapacity = 0;
    lairs.forEach(lair => {
      totalCapacity += lair.getDomiciledMinionCapacity();
    })

    $slideWindow.setHeader(X.createElement(`<span class='minions-state'>${MinionDataStore.size()} of ${totalCapacity} minions summoned from ${lairs.length} active lairs</span>`));
  }

  function updateMinions() {
    if (MinionDataStore.size() === 0) {
      return $slideWindow.setContent(X.createElement(`<div class='empty'>&nbsp;</div>`))
    }

    const speciesList = X.createElement(`<div class='species-list'></div>`);

    SpeciesRegistry.forEach(code => {
      const minions = MinionDataStore.all().filter(minion => { return minion.getSpeciesCode() === code })
      if (minions.length > 0) {
        speciesList.appendChild(X.createElement(`<div class='species-name'>${minions.length} ${Species(code).getPluralName()}</div>`));
        speciesList.appendChild(X.createElement(`<div class='details'>0 have jobs</div>`));
      }
    });

    $slideWindow.setContent(speciesList);
  }

  function reposition() { $slideWindow.reposition(); }

  return Object.freeze({
    build,
    reposition,
  });

})();

