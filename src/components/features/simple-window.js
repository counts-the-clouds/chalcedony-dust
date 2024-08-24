global.SimpleWindow = (function() {

  function open(feature) {
    const room = feature.getConstruction();
    const background = room.getBackground();

    const casement = FeatureWindows.openCasementWith(feature,getBase(room),{ scrollingPanel:false });
    casement.setTitle(room.getDisplayName());
    casement.setBounds(getBounds(room));

    if (background) {
      const backgroundElement = casement.getCasementContent().querySelector('.has-background');
      backgroundElement.style['background-image'] = X.assetURL(room.getBackground());
    }
  }

  function getBounds(room) {
    const position = MouseMonitor.getPosition();
    const top = position.y - 40;
    const left = position.x - 150;

    if (room.getLayout() === 'card-layout') {
      return { top, left, height:400, width:300 }
    }
  }

  function getBase(room) {
    if (room.getLayout() === 'card-layout') {
      return `<div class='simple-window card-layout has-background'>
        <div class='details'>${room.getDetails()}</div></div>`
    }
    throw `Unrecognized SimpleWindow layout: ${room.getLayout()}`;
  }

  return Object.freeze({
    open
  });

})()