ClockRegistry.register('generate-tile', {

  duration: 60000,
  repeat: true,

  onUpdate: clock => {
    const time = TimeHelper.millisecondsToTimeString(clock.getElapsedTime());
    console.log(`(${clock.getID()}) `,time);
  },

  onComplete: clock => {
    console.log(`On Complete (${clock.getID()})`);
    GameController.drawTile();
  }

});