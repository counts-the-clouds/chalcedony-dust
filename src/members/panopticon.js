global.Panopticon = (function() {

  function watchFor(eventType, options) {

  }

  async function induce(eventType, data={}) {
    try {
      console.log(`Induce[${eventType}]`,data);
    }
    catch (error) {
      logError(`Error through when inducing ${eventType}`,error,{ system:'Panopticon' });
    }
  }

  return Object.freeze({
    watchFor,
    induce,
  });

})();
