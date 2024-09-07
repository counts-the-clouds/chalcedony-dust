global.WorkerControl = (function() {

  function build(feature) {
    const construction = feature.getConstruction();
    return X.createElement(`<div class='worker-control'>[Worker Control]</div>`);
  }

  return Object.freeze({ build })

})();
