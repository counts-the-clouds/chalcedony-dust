global.MinionRoster = (function() {

  let $lairs;
  let $assignments;

  function reset() {
    $lairs = {};
    $assignments = {};
  }

  // Register a new lair. This will be called when an empty lair is upgraded to
  // a basic lair.
  //   id: The feature id of the lair
  //   code: The minion code
  //   size: The size of the room's feature.
  function registerLair(id, code, size) {
    const minionCount = Math.floor(size / Minion(code).getTilesPerMinion());
    $lairs[id] = { code, minionCount };
  }

  function getLairCount() { return Object.keys($lairs).length; }
  function getLairStatus(id) { return { ...$lairs[id] }; }

  // Assign A minion to work at a given feature.
  //   id: The feature ID
  //   slot: The slot they're assigned to.
  //   code: Minion code
  function assignMinion(id, slot, code) {
    const minionStatus = getMinionMap()[code];

    if (minionStatus.assigned >= minionStatus.summoned) { throw `Cannot assign more ${code} minions`; }

    if ($assignments[id] == null) { $assignments[id] = {}; }
    $assignments[id][slot] = code;
  }

  function clearAssignment(id, slot) {
    if ($assignments[id][slot]) {
      delete $assignments[id][slot];
    }
  }

  function getAssignments(id) {
    return { ...$assignments[id] };
  }

  // Returns a map of the overall minion roster status in the format:
  //    { goblin:{ count:4, assigned:0 }, kobold:... }
  function getMinionMap() {
    const minionMap = {};

    Object.keys($lairs).forEach(id => {
      const lair = $lairs[id];
      if (minionMap[lair.code] == null) { minionMap[lair.code] = { count:0, assigned:0 }; }
      minionMap[lair.code].count += lair.minionCount;
    });

    Object.keys($assignments).forEach(id => {
      Object.keys($assignments[id]).forEach(slot => {
        minionMap[$assignments[id][slot]].assigned += 1;
      });
    });

    return minionMap;
  }

  function getTotalCount() { return reduceMinionMap('count'); }
  function getTotalAssigned() { return reduceMinionMap('assigned'); }

  function reduceMinionMap(key) {
    const map = getMinionMap();
    return Object.keys(map).reduce((accumulator,code) => {
      return accumulator + map[code][key];
    },0);
  }

  // === Serialization =========================================================

  function pack() {
    return {
      lairs: $lairs,
    }
  }

  function unpack(data) {
    $lairs = data.lairs;
  }

  return Object.freeze({
    reset,
    registerLair,
    getLairCount,
    getLairStatus,
    assignMinion,
    clearAssignment,
    getAssignments,
    getMinionMap,
    getTotalCount,
    getTotalAssigned,
    pack,
    unpack,
  });

})();