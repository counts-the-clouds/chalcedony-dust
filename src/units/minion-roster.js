global.MinionRoster = (function() {

  let $lairs;
  let $assignments;

  function reset() {
    $lairs = {};
    $assignments = {};
  }

  // Register a new lair. This will be called when an empty lair is upgraded to
  // a basic lair.
  //   id: The room id of the lair
  //   code: The minion code
  //   size: The size of the room's feature.
  function registerLair(id, code, size) {
    const minion = Minion(code);
    const minionMax = Math.floor(size / minion.getTilesPerMinion());

    $lairs[id] = { code, minionMax, minionCount:0 };
  }

  // Summon a single minion given the lair ID.
  function summonMinion(id) {
    const lair = $lairs[id];

    if (lair == null) { throw `No lair with id ${id}`; }
    if (lair.minionMax === lair.minionCount) { throw `No room in lair to summon another minion`; }

    lair.minionCount += 1;

    // TODO: Spend resources as well
  }

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
  //    { goblin:{ max:4, summoned:2, assigned:0 }, kobold:... }
  function getMinionMap() {
    const minionMap = {};

    Object.keys($lairs).forEach(id => {
      const lair = $lairs[id];
      if (minionMap[lair.code] == null) { minionMap[lair.code] = { max:0, summoned:0, assigned:0 }; }
      minionMap[lair.code].max += lair.minionMax;
      minionMap[lair.code].summoned += lair.minionCount;
    });

    Object.keys($assignments).forEach(id => {
      Object.keys($assignments[id]).forEach(slot => {
        minionMap[$assignments[id][slot]].assigned += 1;
      });
    });

    return minionMap;
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
    summonMinion,
    assignMinion,
    clearAssignment,
    getAssignments,
    getMinionMap,
    pack,
    unpack,
  });

})();