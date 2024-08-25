global.Observer = function(eventType, callback) {

  // An observer is a non-persistent analog to the reaction model. Reactions
  // are used to do things like trigger events and because they can be added
  // and removed from the game state they need to be persisted when the game is
  // saved. The Observers on the other hand are going to be used to keep the UI
  // components in sync. They are added to the Panopticon when the associated
  // component is built and don't need to be persisted.
  //
  // Important: If the associated UI component is removed for whatever reason
  //            it must also remove whatever observers it added.

  const $eventType = eventType;
  const $callback = callback;
  const $conditions = [];

  Validate.exists('EventType',$eventType);
  Validate.exists('Callback',$callback);

  function getEventType() { return $eventType; }
  function addCondition(condition) { $conditions.push(condition); }
  function addConditions(conditions) { conditions.forEach(condition => addCondition(condition)); }
  function getConditions() { return $conditions; }
  function trigger(data) { $callback(data); }

  return Object.freeze({
    getEventType,
    addCondition,
    addConditions,
    getConditions,
    trigger,
  });

}