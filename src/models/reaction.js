global.Reaction = function(options) {

  // TODO: Consider adding a repeat type. These reactions will normally trigger
  //       things like events, and once triggered should probably never be run
  //       again. I will need to keep a list of reactions that have been
  //       triggered. I will also need to keep a list of events we've seen.
  //       A repeat type though could be used to prevent the automatic removal
  //       of the reaction on completion. This could be useful for a repeating
  //       event or an event that plays until some other flag is set.

  const $id = options.id || ReactionDataStore.nextID();
  const $eventType = options.eventType;
  const $triggerCode = options.triggerCode;
  const $conditions = options.condition ? [options.condition] : (options.conditions || []); // Behold! The four argument ternary.

  Validate.exists('Trigger',$triggerCode);
  Validate.exists('EventType',$eventType);
  Validate.isIn('EventType',$eventType,Object.values(EventType));

  function getID() { return $id; }
  function getEventType() { return $eventType; }
  function getConditions() { return $conditions; }

  function trigger(data) {
    TriggerRegistry.lookup($triggerCode).triggerFunction(data);
  }

  function toString() { return `Reaction:${$id}` }

  function pack() {
    return {
      id: $id,
    }
  }

  // ===========================================================================

  const $self = Object.freeze({
    getID,
    getEventType,
    getConditions,
    trigger,
    toString,
    pack,
  });

  ReactionDataStore.store($self);

  return $self;
}
