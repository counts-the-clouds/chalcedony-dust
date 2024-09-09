global.MinionHelper = {

  allAssignedMinions: function() {
    let assigned = [];

    RoomDataStore.all().forEach(room => {
      if (room.hasWorkers()) {
        assigned = assigned.concat(Object.values(room.getWorkerMap()));
      }
    });

    ResourceDataStore.all().forEach(resource => {
      assigned = assigned.concat(Object.values(resource.getWorkerMap()));
    });

    return assigned;
  },

  allUnassignedMinions: function() {
    const assigned = MinionHelper.allAssignedMinions();
    return MinionDataStore.allIDs().filter(id => {
      return !assigned.includes(id);
    });
  },

}