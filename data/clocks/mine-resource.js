ClockRegistry.register('mine-resource', {

  duration: 60000,
  repeat: true,

  onComplete: clock => {
    console.log("[Mine Resource]")
  }

});