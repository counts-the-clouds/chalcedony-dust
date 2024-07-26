global.AnimationController = (function () {

  // I'm assuming I'm going to need to keep track of all the animations running
  // in the system, just in case there's a long running animation that I need
  // to modify or cancel while it's playing.
  let $flicks = {};

  function addFlick(options) {
    const flick = Flick(options.code);
    flick.setAnimationID(options.id);
    flick.setAnimationTarget(options.target);
    flick.start();

    if ($flicks[options.id]) {
      removeFlick(options.id);
      console.warn(`An animation on ${options.id} is already playing.`);
      console.warn(`Not sure what to do in this case yet.`)
    }

    $flicks[options.id] = flick;
  }

  function removeFlick(id) {
    delete $flicks[id];
  }

  return Object.freeze({
    addFlick,
    removeFlick,
  });

})();
