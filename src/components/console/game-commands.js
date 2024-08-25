global.GameCommands = {

  save: function() {
    GameState.saveState();
    return `Game Saved.`
  },

  gainMana: function(amount) {
    if (isNaN(amount)) { amount = 100; }
    if (amount < 1) { throw `Positive numbers only please.`; }

    GameState.gainMana(amount);
    StatusBar.update();

    return `Success. Current Mana: ${GameState.getMana()}`;
  }

};