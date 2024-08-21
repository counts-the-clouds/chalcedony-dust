global.RoomWindow = (function() {

  async function open(feature) {
    const casement = FeatureWindows.openCasementWith(feature,`
      <div class='resource-window'>[ROOM WINDOW]</div>`);
  }

  return Object.freeze({
    open
  });

})()