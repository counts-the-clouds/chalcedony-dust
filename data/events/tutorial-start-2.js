EventRegistry.register('tutorial-start-2', {

  stages:[{
    pages: [
      { text:`Ahh, that's better. Finally a little breathing room. Not nearly enough of course, but it's a start.` },
      { text:`Though it pains me to admit it, digging out this little hall has left me feeling weary.` },
      { text:`I know that expanding in this way is not free. Exerting my influence on the stone surrounding me takes
              both time and effort, and every time I do it drains just a little of the mana that serves as my life 
              force.` },
      { text:`However, in order to replenish this mana, I must continue to expand. Hopefully I will find some usable
              resources sometime soon.`}
    ]
  }],

  onFinish: function() {
    ClockManager.setClockSpeed(3);
  }

});
