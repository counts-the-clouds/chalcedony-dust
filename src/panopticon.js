global.Panopticon = (function() {

  async function induce(eventType, data={}) {
    try {
      ReactionDataStore.all().forEach(reaction => {
        if (reaction.getEventType() === eventType) {
          if (CentralScrutinizer.allConditionsPass(reaction.getConditions(),data)) {
            reaction.trigger(data);
          }
        }
      });
    }
    catch (error) {
      logError(`Error through when inducing ${eventType}`,error,{ system:'Panopticon' });
    }
  }

  return Object.freeze({
    induce,
  });

})();
