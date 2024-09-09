global.IsLair = function(data = {}) {

  let $room;
  let $minions = data.minions || [];

  function getLairData() { return $room.getData().lair; }
  function getDomiciledMinions() { return [...$minions]; }
  function getDomiciledMinionCount() { return $minions.length; }
  function getDomiciledMinionCapacity() { return Math.floor($room.getFeature().getSize() / getLairData().minionsPerTile); }

  function addMinion(minion) {
    if (getDomiciledMinionCount() >= getDomiciledMinionCapacity()) { throw `Cannot add minion, the lair is full.` }
    $minions.push(minion.getID());
  }

  // ===========================================================================

  function pack() {
    return {
      minions: $minions,
    };
  }

  function attach(model) {
    $room = model;
    model.getLairData = getLairData;
    model.getDomiciledMinions = getDomiciledMinions;
    model.getDomiciledMinionCount = getDomiciledMinionCount;
    model.getDomiciledMinionCapacity = getDomiciledMinionCapacity;
    model.addMinion =  addMinion;
  }

  return Object.freeze({
    pack,
    attach,
  });

}
