ClockRegistry.register('generate-tile', {

  duration: 60000,
  repeat: true,

  onComplete: clock => {
    console.log(`On Complete (${clock.getID()})`);
    GameController.drawTile();
  }

});