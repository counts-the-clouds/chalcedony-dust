ClockRegistry.register('build-feature', {

  onComplete: clock => {
    console.log("Completed The Build Feature Clock...");
    console.log("Context:",clock.getContext());
  }

});