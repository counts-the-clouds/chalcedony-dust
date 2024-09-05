global.LairWindow = (function() {

  function open(feature) {
    const room = feature.getConstruction();
    const lairData = room.getLairData();

    console.log(`Open Lair window for ${feature}`,lairData);
  }

  return Object.freeze({
    open
  })

})()