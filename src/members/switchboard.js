global.Switchboard = (function() {

  // The Switchboard is just a passthrough to a globally available event
  // emitter.

  const Events = require("events");
  const $eventEmitter = new Events.EventEmitter()

  function reset() { $eventEmitter.removeAllListeners(); }
  function emit(name, data) { $eventEmitter.emit(name, data); }
  function on(name, callback) { $eventEmitter.on(name, callback); }
  function once(name, callback) { $eventEmitter.once(name, callback); }

  return Object.freeze({
    reset,
    emit,
    on,
    once,
  });

})();