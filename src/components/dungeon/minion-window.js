global.MinionWindow = (function() {

  let $slideWindow;

  function build() {
    $slideWindow = SlideWindow({ selector:'#minionsWindow' });
    updateHeader();
    updateMinions();

    Panopticon.addObserver(Observer(EventType.workerAssignmentChanged, () => {
      updateMinions();
    }));

    Panopticon.addObserver(Observer(EventType.constructionComplete, data => {
      if (BlueprintRegistry.lookup(data.code).type === TileType.room) {
        if (RoomRegistry.lookup(data.code).lair != null) {
          updateHeader();
          updateMinions();
        }
      }
    }));
  }

  function updateHeader() {
    const lairCount = MinionRoster.getLairCount();

    if (lairCount === 0) {
      return $slideWindow.setHeader(X.createElement(`<span class='minions-state empty'>There are no active lairs.</span>`))
    }

    $slideWindow.setHeader(X.createElement(`<span class='minions-state'>${MinionRoster.getTotalCount()} minions summoned from ${lairCount} active lairs</span>`));
  }

  function updateMinions() {
    if (MinionRoster.getTotalCount() === 0) {
      return $slideWindow.setContent(X.createElement(`<div class='empty'>&nbsp;</div>`));
    }

    const minionMap = MinionRoster.getMinionMap();
    const speciesList = X.createElement(`<div class='species-list'></div>`);

    Object.keys(minionMap).forEach(code => {
      const minion = Minion(code);
      const count = minionMap[code].count;

      if (count > 0) {
        const name = (count === 1) ? minion.getName() : minion.getPluralName();
        speciesList.appendChild(X.createElement(`<div class='species-name'>${minionMap[code].count} ${name}</div>`));
        speciesList.appendChild(X.createElement(`<div class='details'>${minionMap[code].assigned} have jobs</div>`));
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

