ClockRegistry.register('generate-tile', {

  duration: 60000,
  repeat: true,

  onComplete: () => {
    GameController.drawTile();
  }

});