global.SimpleWindow = (function() {

  function open(feature) {
    const room = feature.getConstruction();

    const casement = FeatureWindows.openCasementWith(feature,`
      <div class='simple-window'>
        <h4>[Simple Window]</h4>
        <p>And a description for whatever this is.</p>
      </div>`);
  }

  return Object.freeze({
    open
  });

})()