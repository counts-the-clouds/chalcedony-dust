global.Panopticon = (function() {

  const $observers = [];

  function addObserver(observer) { $observers.push(observer); }
  function removeObserver(observer) { $observers.splice($observers.indexOf(observer),1); }

  // When an event is induced it will call the trigger() function for all the
  // Observers and Reactions that match the event type and have their other
  // conditions met.
  async function induce(eventType, data={}) {
    try {
      ReactionDataStore.all().forEach(reaction => react(eventType, reaction, data));
      $observers.forEach(observer => react(eventType, observer, data));
    }
    catch (error) {
      logError(`Error when inducing ${eventType}`,error,{ system:'Panopticon' });
    }
  }

  function react(eventType, reaction, data) {
    if (reaction.getEventType() === eventType) {
      if (CentralScrutinizer.allConditionsPass(reaction.getConditions(),data)) {
        reaction.trigger(data);
      }
    }
  }

  return Object.freeze({
    induce,
    addObserver,
    removeObserver,
  });

})();
