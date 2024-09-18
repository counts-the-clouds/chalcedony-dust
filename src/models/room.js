global.Room = function(data) {
  const $id = data.id || RoomDataStore.nextID();
  const $featureID = data.featureID;
  const $isWorkstation = IsWorkstation(data.isWorkstation);

  let $code = data.code;
  let $clockID = data.clockID;

  Validate.exists('Feature ID',$featureID);

  function getID() { return $id; }
  function getCode() { return $code; }
  function getFeature() { return FeatureDataStore.get($featureID); }
  function getFeatureID() { return $featureID; }
  function setClock(clock) { $clockID = clock.getID(); }
  function removeClock() { $clockID = null; }
  function getClock() { return ClockDataStore.get($clockID); }

  function getData() { return RoomRegistry.lookup($code); }
  function getDisplayName() { return getData().displayName; }
  function getView() { return getData().view; }
  function getViewType() { return getView().type; }
  function getLayout() { return getView().layout; }
  function getBackground() { return getView().background; }

  function getDetails() {
    let text = getView().details;
    const size = getFeature().getSize();

    if (getData().lair) {
      const minion = Minion(getData().lair);
      const count = minion.getMinionCountForSize(size);
      const name = minion.getPluralName();
      text += ` ${count} ${name} have made their home here.`;
    }

    return Weaver({ size }).weave(text);
  }

  // TODO: This has been copied from the resource model. Eventually the way
  //       that worker slots for rooms and resources may diverge so I'm not
  //       sure this should be made into a more general function somewhere.
  //       Doesn't seem worth it for a whole separate extension.
  //
  function getWorkerSlots() {
    const assignments = MinionRoster.getAssignments($featureID);
    const workerSlots = {};

    getData().workerSlots.forEach(slot => {
      workerSlots[slot.code] = {
        name: slot.name,
        requiredSkill: slot.requiredSkill,
        assignedMinion: assignments[slot.code],
      };
    });

    return workerSlots;
  }


  function upgradeTo(code) {
    $code = code;

    const minionCode = getData().lair;
    if (minionCode) {
      MinionRoster.registerLair($featureID, minionCode, getFeature().getSize());
    }
  }

  // ===========================================================================

  function toString() {
    return `Room:${$id}[${$code}]`
  }

  function pack() {
    return {
      id: $id,
      code: $code,
      featureID: $featureID,
      clockID: $clockID,
      isWorkstation: $isWorkstation,
    };
  }

  // ===========================================================================

  const $self = {
    model: 'Room',
    getID,
    getCode,
    getFeature,
    getFeatureID,
    setClock,
    removeClock,
    getClock,
    getData,
    getDisplayName,
    getView,
    getViewType,
    getLayout,
    getBackground,
    getDetails,
    getWorkerSlots,
    upgradeTo,
    toString,
    pack,
  };

  $isWorkstation.attach($self);

  RoomDataStore.store($self);

  return Object.freeze($self);
}
