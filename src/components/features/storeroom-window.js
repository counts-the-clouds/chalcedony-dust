global.StoreroomWindow = (function() {

  function open(feature) {
    const room = feature.getConstruction();

    const casement = FeatureWindows.openCasementWith(feature,`
      <div class='resource-window'>
        <h4>[Storeroom Window]</h4>
        <p>Item Grid for ${room.getInventorySize()} items</p>
      </div>`);
  }

  return Object.freeze({
    open
  });

})()