global.StatusBar = (function() {

  function update() {
    setMana(GameState.getMana());
  }

  function setMana(value) {
    X.first('#lowerBar #manaStatus .value').textContent = value;
  }

  return Object.freeze({
    update
  });


})()